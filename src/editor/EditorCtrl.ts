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

const converter = new showdown.Converter();

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
      private API_URL: string
    ) {
        let titleEditor;
        let bodyEditor;
        let elements, fixedBody;

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
          if (!$scope.paidSectionLinebreakEnd) {
            $scope.paidSectionLinebreakEnd = elements.length;
          }
        }

        const resetPaidSectionSettings = () => {
          $scope.paidSectionLinebreak = 0;
          $scope.paidSectionLinebreakText = 1;
          setPaidSectionLinebreakEnd();
        }

        const adjustPaidSectionLinebreak = (action: "increment" | "decrement") => {
          if (action === "increment") {
            $scope.paidSectionLinebreak += 1;
            $scope.paidSectionLinebreakText += 1;
          } else if (action === "decrement") {
            $scope.paidSectionLinebreak -= 1;
            $scope.paidSectionLinebreakText -= 1;
          }
          $scope.paidSectionLineBreakTouched = true;
        }

        const scrollToLinebreak = (action, toTop?: boolean) => {
          const $container = $('.post-paid-section-preview-paid-section');
          const $scrollTo = $(`.post-paid-section-preview-paid-section > #snap-section-${$scope.paidSectionLinebreak}`);

          if (!toTop) {
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
              $container.scrollTop(0);
              const $scrollTo = $(`.post-paid-section-preview-paid-section > #snap-section-0`);
              $scrollTo.addClass("bb-2 bb-dashed bb-red");
            }, 0);

          }
        }

        $scope.switchLinebreak = (action: "increment" | "decrement") => {
          switch (action) {
            case ("increment"):
              if ($scope.paidSectionLinebreak < $scope.paidSectionLinebreakEnd) {
                adjustPaidSectionLinebreak(action);
                refreshBodies();
                scrollToLinebreak(action);
              }
              break;
            case ("decrement"):
              if ($scope.paidSectionLinebreak > 0) {
                adjustPaidSectionLinebreak(action);
                refreshBodies();
                scrollToLinebreak(action);
              }
              break;
            default:
              break;
          }
        };

        $scope.setPaidSectionCost = (currency) => {
          let cost;
          if (currency === 'bch') {
            // bug in mozilla or angular itself that ng-model does not update when clicking arrows in input number
            cost = document.getElementById("paidSectionCostInBCH").valueAsNumber || 0;
            this.walletService.convertBCHtoUSD(cost).then(({bch, usd}: ICurrencyConversion) => {
              $scope.$apply(function () {
                document.getElementById("paidSectionCostInUSD").value = usd;
                $scope.paidSectionCostInUSD = usd;
              });
            });
          } else if (currency === 'usd') {
            // bug in mozilla or angular itself that ng-model does not update when clicking arrows in input number
            cost = document.getElementById("paidSectionCostInUSD").valueAsNumber || 0;
            this.walletService.convertUSDtoBCH(cost).then(({bch, usd}: ICurrencyConversion) => {
              $scope.$apply(function () {
                document.getElementById("paidSectionCostInBCH").value = bch;
                $scope.paidSectionCostInBCH = bch;
              });
            });
          }

        }

        $scope.togglePaidSection = () => {
          $scope.hasPaidSection = !$scope.hasPaidSection;

          if (!this.currencies) {
            this.walletService.convertBCHtoUSD(1).then((currencies: ICurrencyConversion) => {
              this.currencies = currencies;
              $scope.$apply(function () {
                $scope.showPaidSectionCostInUSD = true;
              });
            });
          }

          if ($scope.hasPaidSection) {
            scrollToLinebreak(undefined, true);
          }
        }

        const refreshBodies = (externalHtml?) => {
          [elements, fixedBody] = this.editorService.getFixedBody(bodyEditor, externalHtml);
          $scope.fixedBody = fixedBody;
          $scope.freeBodyCut = this.editorService.getSectionHtml("free", $scope.paidSectionLinebreak, $scope.paidSectionLinebreakEnd);
          $scope.paidBodyCut = this.editorService.getSectionHtml("paid", $scope.paidSectionLinebreak, $scope.paidSectionLinebreakEnd);
          $scope.paidBodyCutEnd = this.editorService.getSectionHtml("paidEnd", $scope.paidSectionLinebreak, $scope.paidSectionLinebreakEnd);
        }

        let parentPostId;
        let postId;
        let editingMode = "write";
        const locPath = location.pathname.split("/");

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
          const md = converter.makeMd(this.editorService.getFixedBody(bodyEditor)[1]);

          const post = {
            body: md,
            hashtags: $("input#description").val() || "",
            title: document.getElementById("title").innerText,
            hasPaidSection: $scope.hasPaidSection,
            paidSectionLinebreak: $scope.paidSectionLinebreak,
            paidSectionCost: $scope.paidSectionCost
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
              resetPaidSectionSettings();
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

        loadPostDraft(postId);
    }

    private async initTippy() {
      tippy(".hc-tooltip");
    }
}
