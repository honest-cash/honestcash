import tippyJs from "tippy.js";
import "tippy.js/dist/tippy.css";
import * as async from "async";
import mediumEditor from "medium-editor";
import * as showdown from "showdown";
import "medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin.min.css";
import "medium-editor/dist/css/medium-editor.min.css";
import "medium-editor/dist/css/themes/default.min.css";
import { AuthService } from "../auth/AuthService";
import toastr from "../core/config/toastr";
import PostService from "../core/services/PostService";
import * as logger from "../core/lib/logger";
import EditorService from "./services/EditorService";
import WalletService, { ICurrencyConversion } from "../core/services/WalletService";
import ScopeService from "../core/services/ScopeService";
import { IModalElement, IMediumInsertPlugin, ITagIt } from "../core/lib/dependency-interfaces";

import titleEditorConfig from "./config/titleEditor.config";
import bodyEditorConfig from "./config/bodyEditor.config";

type TMediumEditor = any;

const converter = new showdown.Converter({
  simpleLineBreaks: true,
  noHeaderId: true,
});

const DEFAULT_PAID_SECTION_COST_MIN = 0.001;
const DEFAULT_PAID_SECTION_COST_MAX = 1;

interface IEditorScope extends ng.IScope {
  isLoading: boolean;
  draft: any;
  ready: boolean;
  Saving: {
    body: number | null;
    title: number | null;
  };
  saving: boolean;
  isFullPostShown: boolean;
  hasOnlyOneSection: boolean;
  paidSectionEnabled: boolean;
  hasPaidSection: boolean;
  publishTouched: boolean;
  paidSectionLineBreakTouched: boolean;
  paidSectionCostInUSD: number;
  showPaidSectionCostInUSD: boolean;
  paidSectionLinebreakEnd: number;

  setPaidSectionCost(currency: "bch" | "usd"): Promise<any>;
  toggleFullPost(): any;
  trustAsHtml(html: string): any;
  switchLinebreak(action: "increment" | "decrement"): any;
  togglePaidSection(): any;
  displayFeedBody(html: string): any;
  readyToPublish(): any;
  publishPost(postId: number): any;
  switchEditor(): any;
}

export default class EditorCtrl {
  public static $inject = [
    "$scope",
    "$sce",
    "$http",
    "$timeout",
    "PostService",
    "AuthService",
    "editorService",
    "WalletService",
    "ScopeService",
    "API_URL",
  ];

  private currencies: ICurrencyConversion;
  private parentPostId: number;
  private fixedBody;
  private bodyEditor: TMediumEditor;
  private titleEditor: TMediumEditor;

  constructor(
      private $scope: IEditorScope,
      private $sce,
      private $http: ng.IHttpService,
      private $timeout: ng.ITimeoutService,
      private postService: PostService,
      private authService: AuthService,
      private editorService: EditorService,
      private walletService: WalletService,
      private scopeService: ScopeService,
      private API_URL: string,
    ) {
    this.$scope.isLoading = false;
    this.$scope.draft = {};
    this.$scope.ready = false;
    this.$scope.Saving = {
      body: null,
      title: null,
    };
    this.$scope.isFullPostShown = false;
    this.$scope.hasOnlyOneSection = false;
    this.$scope.paidSectionEnabled = false;
    this.$scope.publishTouched = false;
    this.$scope.paidSectionLineBreakTouched = false;
    this.$scope.paidSectionCostInUSD = 0;
    this.$scope.showPaidSectionCostInUSD = false;
    this.$scope.toggleFullPost = () => $scope.isFullPostShown = !$scope.isFullPostShown;

    this.$scope.trustAsHtml = (html: string) => {
      return $sce.trustAsHtml(html);
    };

    const adjustPaidSectionLinebreak = (action: "increment" | "decrement") => {
      if (action === "increment") {
        this.$scope.draft.paidSectionLinebreak += 1;
      } else if (action === "decrement") {
        this.$scope.draft.paidSectionLinebreak -= 1;
      }
      this.$scope.paidSectionLineBreakTouched = true;
    };

    const scrollToLinebreak = (action, toLinebreak?: number) => {
      const $container = $(".post-paid-section-preview-paid-section");
      const $scrollTo = $container.children().eq(this.$scope.draft.paidSectionLinebreak - 1);

      if (toLinebreak === null || toLinebreak === undefined) {
        $container.animate({
          scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop(),
        });​

        let $sibling;

        if (action === "increment") {
          $sibling = $scrollTo.prev();
        } else if (action === "decrement") {
          $sibling = $scrollTo.next();
        }
        if ($sibling) {
          $sibling.removeClass("bb-2 bb-dashed bb-red");
        }
        $scrollTo.addClass("bb-2 bb-dashed bb-red");
      } else {
            // timeout is required
        setTimeout(() => {
          const $scrollTo = $container.children().eq(toLinebreak - 1);
          $container
            .scrollTop(
              $scrollTo.offset().top - $container.offset().top + $container.scrollTop(),
              );
          $scrollTo.addClass("bb-2 bb-dashed bb-red");
        },         0);

      }
    };

    this.$scope.switchLinebreak = (action: "increment" | "decrement") => {
      if (this.$scope.draft.hasPaidSection) {
        switch (action) {
          case ("increment"):
            if (this.$scope.draft.paidSectionLinebreak < this.$scope.paidSectionLinebreakEnd - 1) {
              adjustPaidSectionLinebreak(action);
              this.refreshBodies();
              scrollToLinebreak(action);
            }
            break;
          case ("decrement"):
            if (this.$scope.draft.paidSectionLinebreak > 0) {
              adjustPaidSectionLinebreak(action);
              this.refreshBodies();
              scrollToLinebreak(action);
            }
            break;
          default:
            break;
        }
      }
    };

    this.$scope.setPaidSectionCost = async (currency: "bch"  | "usd") => {
      if (this.$scope.draft.hasPaidSection) {
        const inputBCH = (<HTMLInputElement>document.getElementById("paidSectionCostInBCH"));
        const inputUSD = (<HTMLInputElement>document.getElementById("paidSectionCostInUSD"));
        let cost = currency === "bch" ?
          inputBCH ?
            inputBCH.valueAsNumber :
            0 :
          inputUSD ?
            inputUSD.valueAsNumber :
            0;
        if (currency === "bch") {
          if (cost > DEFAULT_PAID_SECTION_COST_MAX) {
            cost = 1;
            this.$scope.draft.paidSectionCost = 1;
          }
          const { usd } = await this.walletService.convertBCHtoUSD(cost);
          // the following line is due to bug in firefox
          inputUSD.valueAsNumber = usd;
          this.$scope.draft.paidSectionCost = cost;
          this.$scope.paidSectionCostInUSD = usd;
          this.scopeService.safeApply(this.$scope);
        } else if (currency === "usd") {
          const { bch } = await this.walletService.convertUSDtoBCH(cost);
          if (bch > DEFAULT_PAID_SECTION_COST_MAX) {
            this.$scope.draft.paidSectionCost = 1;
            inputBCH.valueAsNumber = 1;
            this.scopeService.safeApply(this.$scope);
            return this.$scope.setPaidSectionCost("bch");
          }
          // the following line is due to bug in firefox
          inputBCH.valueAsNumber = bch;
          this.$scope.paidSectionCostInUSD = cost;
          this.$scope.draft.paidSectionCost = bch;
        }
        this.scopeService.safeApply(this.$scope);
      }
    };

    this.$scope.togglePaidSection = () => {
      this.$scope.draft.hasPaidSection = !this.$scope.draft.hasPaidSection;
      if (this.$scope.draft.hasPaidSection) {
        if (this.$scope.draft.paidSectionLinebreak === null) {
          this.$scope.draft.paidSectionLinebreak = 1;
        }
        checkForCurrencyConversion();
        const linebreak = this.$scope.draft.paidSectionLinebreak !== null ?
        this.$scope.draft.paidSectionLinebreak :
          0;
        setTimeout(
          () => {
            scrollToLinebreak(undefined, linebreak);
          },
          0,
        );
      }
    };

    const checkForCurrencyConversion = () => {
      this.walletService
        .convertBCHtoUSD(this.$scope.draft.paidSectionCost)
        .then((currencies: ICurrencyConversion) => {
          this.$scope.showPaidSectionCostInUSD = true;
          this.$scope.paidSectionCostInUSD = currencies.usd;

          this.scopeService.safeApply(this.$scope, () => {
            this.$scope.setPaidSectionCost("usd");
          });
        });
    };

    let postId;
    let editingMode = "write";
    const locPath = location.pathname.split("/");
    const locQuery = location.search;

    if (locPath[1] === "write" && locPath[2] === "response") {
      this.parentPostId = Number(locPath[3]);

      editingMode = "response";
    }

    if (locPath[1] === "edit") {
      postId = locPath[2];
      editingMode = "edit";
    }

    this.$scope.displayFeedBody = (html: string) => this.postService.displayHTML(html);

    this.$scope.readyToPublish = () => {
      if (!document.getElementById("title").innerText) {
        return toastr.error("The story needs to have a title");
      }

      if (this.bodyEditor.serialize().body.value.length < 50) {
        return toastr.error("The story needs to be at least 50 characters.");
      }

      this.refreshBodies();

      this.bodyEditor.setContent(this.fixedBody, 0);

      ($("#publishModal") as IModalElement).modal("show");

      if (this.$scope.draft.hasPaidSection && this.$scope.draft.paidSectionLinebreak) {
        checkForCurrencyConversion();
        const linebreak = this.$scope.draft.paidSectionLinebreak !== null ?
          this.$scope.draft.paidSectionLinebreak :
          0;

        this.scopeService.safeApply(this.$scope);

        scrollToLinebreak(undefined, linebreak);
      }
    };

    this.$scope.publishPost = (postId: number) => {
      if (this.$scope.draft.hasPaidSection && !this.$scope.paidSectionLineBreakTouched) {
        this.$scope.publishTouched = true;
        return;
      }

      if (this.$scope.isLoading) {
        return toastr.info("Saving...");
      }

      this.$scope.isLoading = true;

      let publishedPost;

      async.series(
        [
          (cb: any) =>
          async.each(
            ["title", "body", "hashtags", "paidSection"],
            async (element: "title" | "body" | "hashtags" | "paidSection", cb: any) => {
              await this.saveDraftElement(element);

              cb();
            },
            cb),
          async (cb: any) => {
            const response = await this.$http.put(`${this.API_URL}/draft/${postId}/publish`, {});

            if (response.status !== 200) {
              return cb(response);
            }

            publishedPost = response.data;

            return cb();
          },
        ],
        (errResponse) => {
          this.$scope.isLoading = false;

          if (errResponse) {
            if (errResponse.status === 400) {
              if (errResponse.data.code === "TITLE_TOO_SHORT") {
                return toastr.warning("Title is too short.");
              }

              if (errResponse.data.code === "POST_TOO_SHORT") {
                return toastr
                  .warning("Your story is too short. The minimum number of characters is 50.");
              }
            }

            return toastr.warning(errResponse.data.desc || errResponse.data.code);
          }

          toastr.success("You have successfully published your story.");

          ($("#publishModal") as IModalElement).modal("hide");

          $timeout(
            () => {
              location.href = `/${publishedPost.user.username}/${publishedPost.alias}/`;
            },
            500,
          );
        });
    };

    this.$scope.switchEditor = () => {
      if (editingMode === "write") {
        window.location.href = `/markdown/write`;
      } else if (editingMode === "edit") {
        window.location.href = `/markdown/edit/${postId}`;
      } else if (editingMode === "response") {
        window.location.href = `/markdown/write/response/${this.parentPostId}`;
      }
    };

    this.loadPostDraft(postId);
  }

  private onContentChangedFactory = (element: "title" | "body") => () => {
    if (this.$scope.draft.status === "published") {
      return;
    }

    if (this.$scope.Saving[element]) {
      clearTimeout(this.$scope.Saving[element]);
    }

    this.$scope.Saving[element] = setTimeout(
      async () => {
        try {
          await this.saveDraftElement(
            element,
          );
        } catch (err) {
          return toastr.error("Draft could not be saved.");
        }

        toastr.success("Draft has been saved.");
      },
      3000,
    );
  }

  private initMediumEditor(title: string, bodyMD: string) {
    this.titleEditor = new mediumEditor("#title", titleEditorConfig);
    this.bodyEditor = new mediumEditor("#body", bodyEditorConfig({
      placeHolderText: this.parentPostId ?
        "Write a comment" :
        "Write your story",
    }));

    ($("#body") as IMediumInsertPlugin).mediumInsert({
      // (object) Addons configuration
      addons: {
        embeds: false,
        // (object) Image addon configuration
        images: {
          // (integer) Min number of images that automatically form a grid
          autoGrid: 3,
          captionPlaceholder: "",
          // (boolean) Enable captions
          captions: false,
          deleteMethod: "",
          // (string) A relative path to a delete script
          deleteScript: "",
          // (object) extra parameters send on the delete ajax request
          // see http://api.jquery.com/jquery.ajax/
          fileDeleteOptions: {},
          // DEPRECATED: Use fileUploadOptions instead
          formData: {},
          // (string) A label for an image addon
          label: "<span class='fa fa-camera'></span>",
          // DEPRECATED: Use fileUploadOptions instead
          uploadScript: null,
          // (boolean) Show an image before it is uploaded
          // (only in browsers that support this feature)
          preview: false,
          fileUploadOptions: {
                      // (object) File upload configuration.
                      // See https://github.com/blueimp/jQuery-File-Upload/wiki/Options
            url: `${this.API_URL}/upload/image`, // (string) A relative path to an upload script
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i, // (regexp) Regexp of accepted file types
            headers: {
              "x-auth-token": this.authService.getAuthToken(),
            },
          },
          // (object) Actions for an optional second toolbar
          actions: {
            // (object) Remove action configuration
            remove: {
              // (string) Label for an action
              label: "<span class='fa fa-times'></span>",
              // (function) Callback function called when an action is selected
              clicked: ($el) => {
                const $event = $.Event("keydown");

                $event.which = 8;
                $(document).trigger($event);
              },
            },
          },
          messages: {
            acceptFileTypesError: "This file is not in a supported format: ",
            maxFileSizeError: "This file is too big: ",
          },
          uploadCompleted: ($el, data) => {
            console.log($el, data);
          },
          uploadFailed: (uploadErrors, data) => {
            console.log(uploadErrors, data);
          },
        },
      },
      editor: this.bodyEditor,
    });

    if (title) {
      document.getElementById("title").setAttribute("data-placeholder", "");
      this.titleEditor.setContent(title, 0);
    }

    if (!title && this.$scope.draft.parentPostId) {
      this.titleEditor.setContent(title || `RE: ${this.$scope.draft.parentPost.title}`, 0);
    }

      if (title) {
        document.getElementById("title").setAttribute("data-placeholder", "");
        this.titleEditor.setContent(title, 0);
      }

      if (!title && this.$scope.draft.parentPostId) {
        this.titleEditor.setContent(title || `RE: ${this.$scope.draft.parentPost.title}`, 0);
      }

      if (bodyMD) {
        document.getElementById("body").setAttribute("data-placeholder", "");
        const html = converter.makeHtml(bodyMD);
        this.refreshBodies(html);
        this.setPaidSectionLinebreakEnd();
        this.bodyEditor.setContent(this.fixedBody, 0);
      }


    this.bodyEditor.subscribe("editableInput", this.onContentChangedFactory("body"));
    this.titleEditor.subscribe("editableInput", this.onContentChangedFactory("title"));
  }

  private initEditor(postId: number) {
    if (!postId) {
      alert("Editor cannot be initialized");
    }

    ($("#description") as ITagIt).tagit({
      tagLimit: 6,
      afterTagAdded: (event, ui) => {
        if (this.$scope.ready) {
          this.saveDraftElement("hashtags");
        }
      },
    });

    const hashtags = this.$scope.draft.userPostHashtags || [];

    hashtags.forEach((hashtag) => {
      ($("#description") as ITagIt).tagit("createTag", hashtag.hashtag);
    });

    this.initMediumEditor(this.$scope.draft.title, this.$scope.draft.bodyMD);

    this.initTippy();
    this.$scope.ready = true;
  }

  private async loadPostDraft(lPostId: number) {
    let url = this.API_URL;

    url += this.parentPostId ?
      `/draft?parentPostId=${this.parentPostId}` :
      lPostId ? `/post/${lPostId}` : "/draft";

    const response = await this.$http.get(url);

    this.$scope.draft = response.data;

      ($("#description") as ITagIt).tagit({
        tagLimit: 6,
        afterTagAdded: (event, ui) => {
          if (this.$scope.ready) {
            this.saveDraftElement("hashtags");
          }

    this.$scope.paidSectionEnabled = this.$scope.draft.parentPostId ? false : true;

    this.resetPaidSectionCostIfNull();
    this.initEditor(this.$scope.draft.id);

    this.scopeService.safeApply(this.$scope);
  }

  private resetPaidSectionCostIfNull() {
    if (!this.$scope.draft.paidSectionCost || this.$scope.draft.paidSectionCost === 0) {
      this.$scope.draft.paidSectionCost = DEFAULT_PAID_SECTION_COST_MIN;
      this.scopeService.safeApply(this.$scope);
    }
  }

  private get bodyEditorHtml() {
    return this.bodyEditor.serialize().body.value;
  }

  private async saveDraftElement(element: "title" | "paidSection" | "body" | "hashtags") {
    logger.log(`Saving draft element ${element}`);

    this.refreshBodies();

    const md = converter.makeMd(
      this.editorService.getFixedBody(this.bodyEditorHtml),
    );

    const post = {
      body: md,
      hashtags: $("input#description").val() || "",
      title: document.getElementById("title").innerText,
      hasPaidSection: this.$scope.draft.hasPaidSection,
      paidSectionLinebreak: this.$scope.draft.paidSectionLinebreak,
      paidSectionCost: this.$scope.draft.paidSectionCost,
    };

    logger.log(post);

    if (!post.body && !post.title && !post.hashtags) {
      this.$scope.saving = null;

      return;
    }

    if (
      element === "paidSection" &&
      post.hasPaidSection &&
      this.$scope.paidSectionLineBreakTouched &&
      post.paidSectionCost === 0
    ) {
      this.$scope.saving = null;

      return;
    }

    const response = await this.$http.put(
      `${this.API_URL}/draft/${this.$scope.draft.id}/${element}`,
      post,
    );

    logger.log(`Successfully saved the element ${element}`);

    this.$scope.saving = null;

    return response;
  }

  private refreshBodies(externalHtml?: string) {
    this.fixedBody = this.editorService.getFixedBody(this.bodyEditorHtml, externalHtml);
      this.$scope.hasOnlyOneSection = $(this.fixedBody).length < 2 ?
        true :
        false;

      this.$scope.fixedBody = this.fixedBody;
      this.$scope.freeBodyCut = this.editorService
      .getSectionHtml("free", this.$scope.paidSectionLinebreak, this.$scope.paidSectionLinebreakEnd);
      this.$scope.paidBodyCut = this.editorService
      .getSectionHtml("paid", this.$scope.paidSectionLinebreak, this.$scope.paidSectionLinebreakEnd);
      this.$scope.paidBodyCutEnd = this.editorService
      .getSectionHtml("paidEnd", this.$scope.paidSectionLinebreak, this.$scope.paidSectionLinebreakEnd);
      this.setPaidSectionLinebreakEnd();
      this.resetPaidSectionProperties();
  }

  private setPaidSectionLinebreakEnd() {
    this.$scope.paidSectionLinebreakEnd = $(this.fixedBody).length;
  }

  private resetPaidSectionProperties() {
      if (this.$scope.hasOnlyOneSection) {
        this.$scope.draft.paidSectionCost = null;
        this.$scope.draft.paidSectionLinebreak = null;
        this.$scope.draft.hasPaidSection = false;
        this.scopeService.safeApply(this.$scope);
      }
  }

  private async initTippy() {
    tippyJs(".hc-tooltip");
  }
}
