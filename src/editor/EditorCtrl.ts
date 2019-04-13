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
import EditorService from "./services/EditorService";
import WalletService, { ICurrencyConversion } from "../core/services/WalletService";
import ScopeService from "../core/services/ScopeService";
import { IModalElement, IMediumInsertPlugin, ITagIt } from "../core/lib/dependency-interfaces";

const converter = new showdown.Converter({
  simpleLineBreaks: true,
  noHeaderId: true,
});

const DEFAULT_PAID_SECTION_COST_MIN = 0.001;
const DEFAULT_PAID_SECTION_COST_MAX = 1;

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

  constructor(
      private $scope,
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
    let titleEditor;
    let bodyEditor;
    let fixedBody;

    $scope.isLoading = false;
    $scope.draft = {};
    $scope.ready = false;
    $scope.Saving = {
      body: false,
      title: false,
    };
    $scope.isFullPostShown = false;
    $scope.paidSectionEnabled = false;
    $scope.hasPaidSection = false;
    $scope.publishTouched = false;
    $scope.paidSectionLineBreakTouched = false;
    $scope.paidSectionCostInUSD = 0;
    $scope.showPaidSectionCostInUSD = false;
    $scope.toggleFullPost = () => $scope.isFullPostShown = !$scope.isFullPostShown;

    $scope.trustAsHtml = (html) => {
      return $sce.trustAsHtml(html);
    };

    const resetPaidSectionCostIfNull = () => {
      if (!$scope.draft.paidSectionCost || $scope.draft.paidSectionCost === 0) {
        $scope.draft.paidSectionCost = DEFAULT_PAID_SECTION_COST_MIN;
        this.scopeService.safeApply($scope);
      }
    };

    const setPaidSectionLinebreakEnd = () => {
      $scope.paidSectionLinebreakEnd = $(fixedBody).length;
    };

    const adjustPaidSectionLinebreak = (action: "increment" | "decrement") => {
      if (action === "increment") {
        $scope.draft.paidSectionLinebreak += 1;
      } else if (action === "decrement") {
        $scope.draft.paidSectionLinebreak -= 1;
      }
      $scope.paidSectionLineBreakTouched = true;
    };

    const scrollToLinebreak = (action, toLinebreak?: number) => {
      const $container = $(".post-paid-section-preview-paid-section");
      const $scrollTo = $container.children().eq($scope.draft.paidSectionLinebreak - 1);

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

    $scope.switchLinebreak = (action: "increment" | "decrement") => {
      switch (action) {
        case ("increment"):
          if ($scope.draft.paidSectionLinebreak < $scope.paidSectionLinebreakEnd - 1) {
            adjustPaidSectionLinebreak(action);
            refreshBodies();
            scrollToLinebreak(action);
          }
          break;
        case ("decrement"):
          if ($scope.draft.paidSectionLinebreak > 0) {
            adjustPaidSectionLinebreak(action);
            refreshBodies();
            scrollToLinebreak(action);
          }
          break;
        default:
          break;
      }
    };

    $scope.setPaidSectionCost = async (currency) => {
      let cost = currency === "bch" ?
        (<HTMLInputElement>document.getElementById("paidSectionCostInBCH")).valueAsNumber :
        (<HTMLInputElement>document.getElementById("paidSectionCostInUSD")).valueAsNumber;
      if (currency === "bch") {
        if (cost > DEFAULT_PAID_SECTION_COST_MAX) {
          cost = 1;
          $scope.draft.paidSectionCost = 1;
        }
        const { usd } = await this.walletService.convertBCHtoUSD(cost);
        // the following line is due to bug in firefox
        (<HTMLInputElement>document.getElementById("paidSectionCostInUSD")).valueAsNumber = usd;
        $scope.draft.paidSectionCost = cost;
        $scope.paidSectionCostInUSD = usd;
        this.scopeService.safeApply($scope);
      } else if (currency === "usd") {
        const { bch } = await this.walletService.convertUSDtoBCH(cost);
        if (bch > DEFAULT_PAID_SECTION_COST_MAX) {
          $scope.draft.paidSectionCost = 1;
          (<HTMLInputElement>document.getElementById("paidSectionCostInBCH")).valueAsNumber = 1;
          this.scopeService.safeApply($scope);
          return $scope.setPaidSectionCost("bch");
        }
        // the following line is due to bug in firefox
        (<HTMLInputElement>document.getElementById("paidSectionCostInBCH")).valueAsNumber = bch;
        $scope.paidSectionCostInUSD = cost;
        $scope.draft.paidSectionCost = bch;
      }
      this.scopeService.safeApply($scope);
    };

    $scope.togglePaidSection = () => {
      $scope.draft.hasPaidSection = !$scope.draft.hasPaidSection;
      if ($scope.draft.hasPaidSection) {
        if ($scope.draft.paidSectionLinebreak === null) {
          $scope.draft.paidSectionLinebreak = 1;
        }
        checkForCurrencyConversion();
        const linebreak = $scope.draft.paidSectionLinebreak !== null ?
          $scope.draft.paidSectionLinebreak :
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
        .convertBCHtoUSD($scope.draft.paidSectionCost)
        .then((currencies: ICurrencyConversion) => {
          $scope.showPaidSectionCostInUSD = true;
          $scope.paidSectionCostInUSD = currencies.usd;
          this.scopeService.safeApply($scope, () => {
            $scope.setPaidSectionCost("usd");
          });
        });
    };

    const refreshBodies = (externalHtml?) => {
      fixedBody = this.editorService.getFixedBody(bodyEditor, externalHtml);
      $scope.fixedBody = fixedBody;
      $scope.freeBodyCut = this.editorService
        .getSectionHtml("free", $scope.paidSectionLinebreak, $scope.paidSectionLinebreakEnd);
      $scope.paidBodyCut = this.editorService
        .getSectionHtml("paid", $scope.paidSectionLinebreak, $scope.paidSectionLinebreakEnd);
      $scope.paidBodyCutEnd = this.editorService
        .getSectionHtml("paidEnd", $scope.paidSectionLinebreak, $scope.paidSectionLinebreakEnd);
      setPaidSectionLinebreakEnd();
    };

    let parentPostId;
    let postId;
    let editingMode = "write";
    const locPath = location.pathname.split("/");
    const locQuery = location.search;

    if (locPath[1] === "write" && locPath[2] === "response") {
      parentPostId = locPath[3];
      editingMode = "response";
    }

    if (locPath[1] === "edit") {
      postId = locPath[2];
      editingMode = "edit";
    }

    const saveDraftElement = (element, cb?) => {
      refreshBodies();
      const md = converter.makeMd(this.editorService.getFixedBody(bodyEditor));

      const post = {
        body: md,
        hashtags: $("input#description").val() || "",
        title: document.getElementById("title").innerText,
        hasPaidSection: $scope.draft.hasPaidSection,
        paidSectionLinebreak: $scope.draft.paidSectionLinebreak,
        paidSectionCost: $scope.draft.paidSectionCost,
      };

      if (!post.body && !post.title && !post.hashtags) {
        $scope.saving = null;

        return cb && cb();
      }

      if (
        element === "paidSection" &&
        post.hasPaidSection &&
        $scope.paidSectionLineBreakTouched &&
        post.paidSectionCost === 0
      ) {
        $scope.saving = null;

        return cb && cb();
      }

      $http.put(`${API_URL}/draft/${$scope.draft.id}/${element}`, post)
          .then((response) => {
            $scope.saving = null;

            return cb && cb();
          },    cb);
    };

    $scope.displayFeedBody = (html: string) => this.postService.displayHTML(html);

    $scope.readyToPublish = () => {
      if (!document.getElementById("title").innerText) {
        return toastr.error("The story needs to have a title");
      }

      if (bodyEditor.serialize().body.value.length < 50) {
        return toastr.error("The story needs to be at least 50 characters.");
      }

      refreshBodies();
      bodyEditor.setContent(fixedBody, 0);

      ($("#publishModal") as IModalElement).modal("show");

      if ($scope.draft.hasPaidSection && $scope.draft.paidSectionLinebreak) {
        checkForCurrencyConversion();
        const linebreak = $scope.draft.paidSectionLinebreak !== null ?
          $scope.draft.paidSectionLinebreak :
          0;
        this.scopeService.safeApply($scope);
        scrollToLinebreak(undefined, linebreak);
      }
    };

    $scope.publishPost = (postId: number) => {
      if ($scope.hasPaidSection && !$scope.paidSectionLineBreakTouched) {
        $scope.publishTouched = true;
        return;
      }

      if ($scope.isLoading === true) {
        return toastr.info("Saving...");
      }

      $scope.isLoading = true;

      let publishedPost;

      async.series([
        (cb: any) => {
          async.parallel([
            (cb: any) => saveDraftElement("title", cb),
            (cb: any) => saveDraftElement("body", cb),
            (cb: any) => saveDraftElement("hashtags", cb),
            (cb: any) => saveDraftElement("paidSection", cb),
          ],             cb);
        },
        (cb: any) => {
          $http.put(`${API_URL}/draft/${postId}/publish`, {})
                  .then((response) => {
                    if (response.status !== 200) {
                      return cb(response);
                    }

                    publishedPost = response.data;

                    return cb();
                  },    cb);
        },
      ],           (errResponse) => {
        $scope.isLoading = false;

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

        $timeout(() => {
          location.href = `/${publishedPost.user.username}/${publishedPost.alias}/`;
        },       500);
      });
    };

    $scope.switchEditor = () => {
      if (editingMode === "write") {
        window.location.href = `/markdown/write`;
      } else if (editingMode === "edit") {
        window.location.href = `/markdown/edit/${postId}`;
      } else if (editingMode === "response") {
        window.location.href = `/markdown/write/response/${parentPostId}`;
      }
    };

    const onContentChangedFactory = (element: "title" | "body") => () => {
      if ($scope.draft.status === "published") {
        return;
      }

      if ($scope.Saving[element]) {
        clearTimeout($scope.Saving[element]);
      }

      $scope.Saving[element] = setTimeout(() => {
        saveDraftElement(element, () => toastr.success("Draft has been saved."));
      },                                  3000);
    };

    const initMediumEditor = (title: string, bodyMD: string) => {
      titleEditor = new mediumEditor("#title", {
        buttons: [],
        disableDoubleReturn: true,
        disableReturn: true,
        paste: {
          cleanAttrs: ["class", "style"],
          cleanPastedHTML: true,
          cleanReplacements: [],
          cleanTags: [
            "meta",
            "dir",
            "h1",
            "h4",
            "h5",
            "h6",
            "table",
            "tr",
            "td",
            "a",
            "ul",
            "li",
            "code",
            "pre",
          ],
          forcePlainText: true,
          unwrapTags: [],
        },
        placeholder: {
          hideOnClick: true,
          text: "Title",
        },
        toolbar: false,
      });

      bodyEditor = new mediumEditor("#body", {
        anchorPreview: true,

        // disabled because broken on markdown
        autoLink: false,
        buttonLabels: "fontawesome",
        extensions: {},
        placeholder: {
          hideOnClick: true,
          text: $scope.draft.parentPostId ? "Write your comment" : "Tell your story...",
        },
        toolbar: {
          buttons: ["bold", "italic", "unorderedlist", "anchor", "h2", "h3", "pre"],
        },
        paste: {
          cleanAttrs: ["id", "class", "style"],
          cleanPastedHTML: true,
          cleanReplacements: [],
          cleanTags: [
            "img",
            "meta",
            "div",
            "h1",
            "h4",
            "h5",
            "h6",
            "table",
            "tr",
            "td",
            "code",
          ],
          forcePlainText: true,
          unwrapTags: [],
        },
      });

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
              url: `${API_URL}/upload/image`, // (string) A relative path to an upload script
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
        editor: bodyEditor,
      });

      if (title) {
        document.getElementById("title").setAttribute("data-placeholder", "");
        titleEditor.setContent(title, 0);
      }

      if (!title && this.$scope.draft.parentPostId) {
        titleEditor.setContent(title || `RE: ${this.$scope.draft.parentPost.title}`, 0);
      }

      if (bodyMD) {
        document.getElementById("body").setAttribute("data-placeholder", "");
        const html = converter.makeHtml(bodyMD);
        refreshBodies(html);
        setPaidSectionLinebreakEnd();
        bodyEditor.setContent(fixedBody, 0);
      }

      bodyEditor.subscribe("editableInput", onContentChangedFactory("body"));
      titleEditor.subscribe("editableInput", onContentChangedFactory("title"));
    };

    const initEditor = (postId: number) => {
      if (!postId) {
        alert("Editor cannot be initialized");
      }

      ($("#description") as ITagIt).tagit({
        tagLimit: 6,
        afterTagAdded: (event, ui) => {
          if ($scope.ready) {
            saveDraftElement("hashtags");
          }
        },
      });

      const hashtags = $scope.draft.userPostHashtags || [];

      hashtags.forEach((hashtag) => {
        ($("#description") as ITagIt).tagit("createTag", hashtag.hashtag);
      });

      initMediumEditor($scope.draft.title, $scope.draft.bodyMD);

      this.initTippy();
      $scope.ready = true;
    };

    const loadPostDraft = (lPostId: number) => {
      let url = API_URL;

      url += parentPostId ?
                `/draft?parentPostId=${parentPostId}` :
                lPostId ? `/post/${lPostId}` : "/draft";

      $http.get(url)
            .then((response) => {
              $scope.draft = response.data;

              $scope.paidSectionEnabled = $scope.draft.parentPostId ? false : true;

              resetPaidSectionCostIfNull();
              initEditor($scope.draft.id);
            },    (err: any) => {
              console.log(err);
            });
    };

    loadPostDraft(postId);

  }

  private async initTippy() {
    tippyJs(".hc-tooltip");
  }
}
