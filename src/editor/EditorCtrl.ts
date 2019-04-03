import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import PanelSnap from 'panelsnap';

import * as async from "async";
import MediumEditor from "medium-editor";
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

const converter = new showdown.Converter({
  simpleLineBreaks: true,
  noHeaderId: true,
});

export default class EditorCtrl {
    public static $inject = [
      "$scope",
      "$sce",
      "$http",
      "$timeout",
      "PostService",
      "AuthService",
      "EditorService",
      "WalletService",
      "ScopeService",
      "API_URL"
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
      private API_URL: string
    ) {
        let titleEditor;
        let bodyEditor;
        let fixedBody;

        $scope.isLoading = false;
        $scope.draft = {};
        $scope.ready = false;
        $scope.Saving = {
          body: false,
          title: false
        };
        $scope.isFullPostShown = false;
        $scope.hasPaidSection = false;
        $scope.publishTouched = false;
        $scope.paidSectionLineBreakTouched = false;
        $scope.paidSectionCostInBCH = 0;
        $scope.paidSectionCostInUSD = 0;
        $scope.showPaidSectionCostInUSD = false;
        $scope.toggleFullPost = () => $scope.isFullPostShown = !$scope.isFullPostShown;

        $scope.trustAsHtml = (html) => {
          return $sce.trustAsHtml(html);
        }

        const setPaidSectionLinebreakEnd = () => {
          $scope.paidSectionLinebreakEnd = $(fixedBody).length;
        }

        const adjustPaidSectionLinebreak = (action: "increment" | "decrement") => {
          if (action === "increment") {
            $scope.draft.paidSectionLinebreak += 1;
          } else if (action === "decrement") {
            $scope.draft.paidSectionLinebreak -= 1;
          }
          $scope.paidSectionLineBreakTouched = true;
        }

        const scrollToLinebreak = (action, toLinebreak?: number) => {
          const $container = $('.post-paid-section-preview-paid-section');
          const $scrollTo = $container.children().eq($scope.draft.paidSectionLinebreak - 1);

          if (toLinebreak === null || toLinebreak === undefined) {
            $container.animate({
              scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
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
              $container.scrollTop($scrollTo.offset().top - $container.offset().top + $container.scrollTop());
              $scrollTo.addClass("bb-2 bb-dashed bb-red");
            }, 0);

          }
        }

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
          let cost;
          if (currency === 'bch') {
            // bug in mozilla or angular itself that ng-model does not update when clicking arrows in input number
            cost = (<HTMLInputElement>document.getElementById("paidSectionCostInBCH")).valueAsNumber || 0;
            const {usd} = await this.walletService.convertBCHtoUSD(cost);
            (<HTMLInputElement>document.getElementById("paidSectionCostInUSD")).valueAsNumber = usd;
            $scope.paidSectionCostInUSD = usd;
            this.scopeService.safeApply($scope);
          } else if (currency === 'usd') {
            // bug in mozilla or angular itself that ng-model does not update when clicking arrows in input number
            cost = (<HTMLInputElement>document.getElementById("paidSectionCostInUSD")).valueAsNumber || 0;
            const {bch} = await this.walletService.convertUSDtoBCH(cost);
            (<HTMLInputElement>document.getElementById("paidSectionCostInBCH")).valueAsNumber = bch;
            $scope.draft.paidSectionCost = bch;
            this.scopeService.safeApply($scope);
          }
        }

        $scope.togglePaidSection = () => {
          $scope.draft.hasPaidSection = !$scope.draft.hasPaidSection;
          if ($scope.draft.hasPaidSection) {
            if ($scope.draft.paidSectionLinebreak === null) {
              $scope.draft.paidSectionLinebreak = 1;
            }
            checkForCurrencyConversion();
            const linebreak = $scope.draft.paidSectionLinebreak !== null ? $scope.draft.paidSectionLinebreak : 0;
            setTimeout(() => {
              scrollToLinebreak(undefined, linebreak);
            }, 0);
          }
        }

        const checkForCurrencyConversion = () => {
          this.walletService.convertBCHtoUSD($scope.draft.paidSectionCost).then((currencies: ICurrencyConversion) => {
            $scope.$apply(function () {
              $scope.showPaidSectionCostInUSD = true;
              $scope.paidSectionCostInUSD = currencies.usd;
              $scope.setPaidSectionCost('bch');
            });
          });
        }

        const refreshBodies = (externalHtml?) => {
          fixedBody = this.editorService.getFixedBody(bodyEditor, externalHtml);
          $scope.fixedBody = fixedBody;
          $scope.freeBodyCut = this.editorService.getSectionHtml("free", $scope.paidSectionLinebreak, $scope.paidSectionLinebreakEnd);
          $scope.paidBodyCut = this.editorService.getSectionHtml("paid", $scope.paidSectionLinebreak, $scope.paidSectionLinebreakEnd);
          $scope.paidBodyCutEnd = this.editorService.getSectionHtml("paidEnd", $scope.paidSectionLinebreak, $scope.paidSectionLinebreakEnd);
          setPaidSectionLinebreakEnd();
        }

        let parentPostId;
        let postId;
        let editingMode = "write";
        const locPath = location.pathname.split("/");
        const locQuery = location.search;
        const isFreshDraft = locQuery.indexOf("new=true") !== -1;

        if (isFreshDraft) {
          editingMode = "writeFresh";
        }

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
            paidSectionCost: $scope.draft.paidSectionCost
          };

          if (!post.body && !post.title && !post.hashtags) {
              $scope.saving = null;

              return cb && cb();
          }

          if (element === "paidSection" && post.hasPaidSection && $scope.paidSectionLineBreakTouched && post.paidSectionCost === 0) {
            $scope.saving = null;

            return cb && cb();
          }

          $http.put(API_URL + "/draft/" + $scope.draft.id + "/" + element, post)
          .then((response) => {
              $scope.saving = null;

              return cb && cb();
          }, cb);
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
          
          $("#publishModal").modal("show");

          if ($scope.draft.hasPaidSection && $scope.draft.paidSectionLinebreak) {
            checkForCurrencyConversion();
            const linebreak = $scope.draft.paidSectionLinebreak !== null ? $scope.draft.paidSectionLinebreak : 0;
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
              (cb) => {
                async.parallel([
                  (cb) => saveDraftElement("title", cb),
                  (cb) => saveDraftElement("body", cb),
                  (cb) => saveDraftElement("hashtags", cb),
                  (cb) => saveDraftElement("paidSection", cb),
                ], cb);
              },
              (cb) => {
                  $http.put(API_URL + "/draft/" + postId + "/publish")
                  .then(response => {
                    if (response.status !== 200) {
                        return cb(response);
                    }

                    publishedPost = response.data;

                    return cb();
                  }, cb);
              }
            ], (errResponse) => {
                $scope.isLoading = false;

                if (errResponse) {
                    if (errResponse.status == 400) {
                        if (errResponse.data.code == "TITLE_TOO_SHORT") {
                            return toastr.warning("Title is too short.");
                        }

                        if (errResponse.data.code == "POST_TOO_SHORT") {
                            return toastr.warning("Your story is too short. The minimum number of characters is 50.");
                        }
                    }

                    return toastr.warning(errResponse.data.desc || errResponse.data.code);
                }

                toastr.success("You have successfully published your story.");

                $("#publishModal").modal("hide");

                $timeout(() => {
                    location.href = `/${publishedPost.user.username}/${publishedPost.alias}/`;
                }, 500);
            });
        };

        $scope.switchEditor = () => {
          if (editingMode === "write") {
            window.location.href = `/markdown/write`;
          } else if (editingMode === "writeFresh") {
            window.location.href = `/markdown/write?new=true`
          } else if (editingMode === "edit"){
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
          }, 3000);
        };

        const initMediumEditor = (title: string, bodyMD: string) => {
            titleEditor = new MediumEditor("#title", {
              buttons: [],
              disableDoubleReturn: true,
              disableReturn: true,
              paste: {
                cleanAttrs: [ "class", "style" ],
                cleanPastedHTML: true,
                cleanReplacements: [],
                cleanTags: [
                  "meta", "dir", "h1", "h4", "h5", "h6", "table", "tr", "td", "a", "ul", "li", "code", "pre"
                ],
                forcePlainText: true,
                unwrapTags: []
              },
              placeholder: {
                hideOnClick: true,
                text: "Title"
              },
              toolbar: false
            });

            bodyEditor = new MediumEditor("#body", {
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
                buttons: [ "bold", "italic", "unorderedlist", "anchor", "h2", "h3", "pre" ]
              },
              paste: {
                cleanAttrs: [ "id", "class", "style" ],
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
                  "code"
                ],
                forcePlainText: true,
                unwrapTags: []
              }
            });

            $("#body").mediumInsert({
                addons: { // (object) Addons configuration
                  embeds: false,
                  images: { // (object) Image addon configuration
                    autoGrid: 3, // (integer) Min number of images that automatically form a grid
                      captionPlaceholder: "",
                      captions: false, // (boolean) Enable captions
                      deleteMethod: "",
                      deleteScript: "", // (string) A relative path to a delete script
                      // (object) extra parameters send on the delete ajax request
                      // see http://api.jquery.com/jquery.ajax/
                      fileDeleteOptions: {},
                      formData: {}, // DEPRECATED: Use fileUploadOptions instead
                      label: "<span class='fa fa-camera'></span>", // (string) A label for an image addon
                      uploadScript: null, // DEPRECATED: Use fileUploadOptions instead
                      preview: false, // (boolean) Show an image before it is uploaded (only in browsers that support this feature)
                      fileUploadOptions: {
                        // (object) File upload configuration.
                        // See https://github.com/blueimp/jQuery-File-Upload/wiki/Options
                        url: API_URL + "/upload/image", // (string) A relative path to an upload script
                        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i, // (regexp) Regexp of accepted file types
                        headers: {
                          "x-auth-token": this.authService.getAuthToken()
                        },
                      },
                      actions: { // (object) Actions for an optional second toolbar
                        remove: { // (object) Remove action configuration
                          label: "<span class='fa fa-times'></span>", // (string) Label for an action
                          // (function) Callback function called when an action is selected
                          clicked: ($el) => {
                            var $event = $.Event("keydown");

                            $event.which = 8;
                            $(document).trigger($event);
                          }
                        }
                      },
                      messages: {
                        acceptFileTypesError: "This file is not in a supported format: ",
                        maxFileSizeError: "This file is too big: "
                      },
                      uploadCompleted: ($el, data) => {
                        console.log($el, data);
                      },
                      uploadFailed: (uploadErrors, data) => {
                        console.log(uploadErrors, data);
                      } 
                  }
                },
                editor: bodyEditor
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

            $("#description").tagit({
              tagLimit: 6,
              afterTagAdded: (event, ui) => {
                  if ($scope.ready) {
                      saveDraftElement("hashtags");
                  }
              }
            });

            const hashtags = $scope.draft.userPostHashtags || [];

            hashtags.forEach((hashtag) => {
                $("#description").tagit("createTag", hashtag.hashtag);
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
                initEditor($scope.draft.id);
            }, (err: any) => {
                console.log(err);
            });
        };

        const loadNewPostDraft = () => {
          let url = API_URL + "/draft";

          $http.post(url, {})
          .then((response) => {
              $scope.draft = response.data;
              initEditor($scope.draft.id);
          }, (err: any) => {
              console.log(err);
          });
        };

        if (editingMode === "writeFresh") {
          loadNewPostDraft();
        } else {
          loadPostDraft(postId);
        }        
    }

    private async initTippy() {
      tippy(".hc-tooltip");
    }
}
