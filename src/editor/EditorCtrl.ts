import * as async from "async";
import MediumEditor from "medium-editor";
import * as showdown from "showdown";
import "medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin.min.css";
import "medium-editor/dist/css/medium-editor.min.css";
import "medium-editor/dist/css/themes/default.min.css";
import { AuthService } from "../auth/AuthService";
import toastr from "../core/config/toastr";
import PostService from "../core/services/PostService";

const converter = new showdown.Converter();

export default class EditorCtrl {
    public static $inject = [
      "$scope",
      "$sce",
      "$http",
      "$timeout",
      "PostService",
      "AuthService",
      "API_URL"
    ];

    constructor(
      private $scope,
      private $sce,
      private $http: ng.IHttpService,
      private $timeout: ng.ITimeoutService,
      private postService: PostService,
      private authService: AuthService,
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
        $scope.hasPaidSection = true;
        $scope.toggleFullPost = () => $scope.isFullPostShown = !$scope.isFullPostShown;

        $scope.trustAsHtml = function(html) {
          return $sce.trustAsHtml(html);
        }

        const truncateText = (str, reverse?) => {
          const [length, ending] = [100, "..."];

          if (str.length > length) {
            if (!reverse) {
              return str.substring(0, length - ending.length) + ending;
            } else {
              return ending + str.substring(str.length - length, str.length);
            }
          } else {
            return str;
          }
        };

        const stringHasString = (string, find) => {
          return string.indexOf(find) !== -1;
        }
        
        const getFixedBody = (externalHtml?) => {
          // converting from html to md to html cleans the body
          const bodyMarkdown = converter.makeMd(externalHtml ? externalHtml : bodyEditor.serialize().body.value);
          const bodyHtml = converter.makeHtml(bodyMarkdown);

          let $bodyHtml = $(bodyHtml);
          // get only the dom elements
          let _elements = $bodyHtml.filter((e) => {
            return $bodyHtml[e].nodeName !== "#text" && $bodyHtml[e].nodeName !== "#comment"
          });

          // to convert mediumeditor default div wrappers to showdown converted syntax
          // showdown only has p tags
          // to the below is to replace those elements
          const replaceContents = [];
          // the html is to replace the body in the editor
          let _fixedBody = '';

          _elements = _elements.map(i => {
            const elem = _elements[i];
            const $elem = $(elem);
            // find regular divs and remove them
            // get the content of the div and its previous sibling
            // so that it is inserted at correct place
            if (elem.nodeName === "DIV" && !stringHasString(elem.className, "medium-insert-images")) {
              const previous = $elem.prev();
              const content = $elem;
              replaceContents.push([content, previous]);
              $elem.remove();
              return null;
            }
            // find divs that are inserted by the mediumeditor mediuminsert plugin
            // with showdown converted syntax
            // showdown only has img inside a p tag
            // we rewrap the div with p tag here
            if (elem.nodeName === "DIV" && stringHasString(elem.className, "medium-insert-images")) {
              const content = $elem;
              const img = getOuterHtml($(content).find('img'));
              const imgWrapped = `<p>${img}</p>`;
              return $(imgWrapped);
            }
            // kind of trim the body of all unneccessary br tags
            // the honestcash-editor has auto delete feature for more than one new lines
            // we simulate the same by removing all the br tags because p and header tags
            // already provide the margins and paddings
            if (elem.childElementCount === 1 && elem.lastElementChild.nodeName === "BR") {
              $elem.remove();
              return null;
            }
            // we form our last new html
            _fixedBody += getOuterHtml(elem);
            return elem;
          });

          replaceContents.forEach(contentTuple => {
            $(contentTuple[0]).insertAfter($(contentTuple[1]));
          });

          // elements and html is returned as tuple
          return [_elements, _fixedBody];
        }

        const setPaidSectionLinebreakEnd = () => {
          if (!$scope.paidSectionLinebreakEnd) {
            $scope.paidSectionLinebreakEnd = elements.length;
          }
        }

        const getContextElement = (n: "first" | "after" | "last") => {
          switch (n) {
            case "first":
              return elements.eq($scope.paidSectionLinebreak);
            case "after":
              return elements.eq($scope.paidSectionLinebreak + 1);
            case "last":
              return elements.eq($scope.paidSectionLinebreakEnd - 1);
            default:
              break;
          }
        }

        const getOuterHtml = (element) => {
          return $(element).prop("outerHTML");
        }

        const getLinebreakParagraph = (n?: "first" | "after" | "last", trim?) => {

          setPaidSectionLinebreakEnd();

          let paragraph = '';
          let reverse = false;

          switch (n) {
            case "first":
              paragraph = getOuterHtml(getContextElement("first"));
              reverse = true;
              break;
            case "after":
              paragraph = getOuterHtml(getContextElement("after"));
              break;
            case "last":
              paragraph = getOuterHtml(getContextElement("last"));
              break;
            default:
              break;
          }

          if (trim) {
            const $paragraph = $(paragraph);
            // disable trim for images
            if (!$paragraph.find('img').length) {
              // disable trim for lists
              if ($paragraph.prop("nodeName") !== "UL" && $paragraph.prop("nodeName") !== "OL") {
                // get last html element from the paragraph to shorten it
                // the text inside the element will not be truncated
                const children = $paragraph.children();
                const childrenLength = children.length;
  
                if (childrenLength) {
                  let lastChild = children[$paragraph.prop("childElementCount") - 1];
                  // we remove the br if it is the last element
                  // so that Last Free Sentence is not blank
                  if ($(lastChild).prop("nodeName") === "BR") {
                    $(lastChild).remove();
                    lastChild = children[$paragraph.prop("childElementCount") - 1];
                  }
                  
                  paragraph = getOuterHtml(lastChild);
                } else {
                  // if no html tag is existent in the paragraph, shorten the text
                  paragraph = truncateText($paragraph.text(), reverse);
                }
              }
            }
          }
          return paragraph;
        }

        const getCutBody = (type: "free" | "paid" | "paidEnd") => {
          if (type === "free") {
            return getLinebreakParagraph("first", true);
          } else if (type === "paid"){
            return getLinebreakParagraph("after");
          } else if (type === "paidEnd") {
            return getLinebreakParagraph("last");
          }
        }

        const refreshBodies = (externalHtml?) => {
          [elements, fixedBody] = getFixedBody(externalHtml);
          $scope.freeBodyCut = getCutBody("free");
          $scope.paidBodyCut = getCutBody("paid");
          $scope.paidBodyCutEnd = getCutBody("paidEnd");
        }

        const resetPaidSectionSettings = () => {
          $scope.paidSectionLinebreak = 0;
          $scope.paidSectionLinebreakText = 1;
          setPaidSectionLinebreakEnd();
        }

        const adjustPaidSectionLinebreak = (action: "increment" | "decrement") => {
          switch (action) {
            case "increment":
              $scope.paidSectionLinebreak += 1;
              $scope.paidSectionLinebreakText += 1;
              break;
            case "decrement":
              $scope.paidSectionLinebreak -= 1;
              $scope.paidSectionLinebreakText -= 1;
            default:
              break;
          }
        }

        $scope.switchLinebreak = (action: "increment" | "decrement") => {
          switch (action) {
            case ("increment"):
              if ($scope.paidSectionLinebreak < $scope.paidSectionLinebreakEnd) {
                adjustPaidSectionLinebreak(action);
                refreshBodies();
              }
              break;
            case ("decrement"):
              if ($scope.paidSectionLinebreak > 0) {
                adjustPaidSectionLinebreak(action);
                refreshBodies();
              }
              break;
            default:
              break;
          }
        };

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
          const md = converter.makeMd(bodyEditor.serialize().body.value);

          const post = {
            body: md,
            hashtags: $("input#description").val() || "",
            title: document.getElementById("title").innerText
          };

          if (!post.body && !post.title && !post.hashtags) {
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

          resetPaidSectionSettings();
          refreshBodies();
          bodyEditor.setContent(fixedBody, 0);

          $("#publishModal").modal("show");
        };

        $scope.publishPost = (postId: number) => {
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
                  (cb) => saveDraftElement("hashtags", cb)
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
}
