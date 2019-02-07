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
    constructor(
      private $scope,
      private $http,
      private $timeout,
      private postService: PostService,
      private authService: AuthService,
      private API_URL: string
    ) {
        let titleEditor;
        let bodyEditor;

        $scope.isLoading = false;
        $scope.draft = {};
        $scope.ready = false;
        $scope.Saving = {
          body: false,
          title: false
        };

        let parentPostId;
        let postId;
        const locPath = location.pathname.split("/");

        if (locPath[1] === "write" && locPath[2] === "response") {
            parentPostId = locPath[3]
        }

        if (locPath[1] === "write" && locPath[2] === "response") {
            parentPostId = locPath[3]
        }

        if (locPath[1] === "edit") {
            postId = locPath[2];
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

          $('#publishModal').modal('show');
        };

        $scope.publishPost = postId => {
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

                $('#publishModal').modal('hide');

                $timeout(() => {
                    location.href= `/${publishedPost.user.username}/${publishedPost.alias}/`;
                }, 500);
            });
        };

        const onContentChangedFactory = (element) => () => {
            if ($scope.draft.status === "published") {
                return;
            }

            if ($scope.Saving.body) {
                clearTimeout($scope.Saving.body);
            }

            $scope.Saving.body = setTimeout(() => {
                saveDraftElement(element, () => {
                    return toastr.success("Draft has been saved.");
                });
            }, 3000);
        };

        const markDownEl = document.querySelector(".markdown");

        const initMediumEditor = (title, bodyMD: string) => {
            titleEditor = new MediumEditor('#title', {
              buttons: [],
              disableDoubleReturn: true,
              disableReturn: true,
              paste: {
                cleanAttrs: [ 'class', 'style' ],
                cleanPastedHTML: true,
                cleanReplacements: [],
                cleanTags: [
                  'meta', 'dir', 'h1', 'h4', 'h5', 'h6', 'table', 'tr', 'td', 'a', 'ul', 'li', 'code', 'pre'
                ],
                forcePlainText: true,
                unwrapTags: []
              },
              placeholder: {
                hideOnClick: true,
                text: 'Title'
              },
              toolbar: false
            });

            bodyEditor = new MediumEditor('#body', {
              anchorPreview: true,
              autoLink: true,
              buttonLabels: 'fontawesome',
              extensions: {},
              placeholder: {
                hideOnClick: true,
                text: $scope.draft.parentPostId ? "Write your comment" : "Tell your story...",
              },
              toolbar: {
                buttons: [ 'bold', 'italic', "unorderedlist", "anchor", 'h2', 'h3', 'pre' ]
              },
              paste: {
                cleanAttrs: [ "id", "class", "style" ],
                cleanPastedHTML: true,
                cleanReplacements: [],
                cleanTags: [
                  "img",
                  'meta',
                  "div",
                  'h1',
                  'h4',
                  'h5',
                  'h6',
                  'table',
                  'tr',
                  'td',
                  'code',
                  /**, 'a', 'ul', 'li', 'code' */
                ],
                forcePlainText: true,
                unwrapTags: []
              }
            });

            $('#body').mediumInsert({
                editor: bodyEditor,

                addons: { // (object) Addons configuration

                  embeds: false,
                  images: { // (object) Image addon configuration
                    
                    autoGrid: 3, // (integer) Min number of images that automatically form a grid
                      captionPlaceholder: '',
                      captions: false, // (boolean) Enable captions
                      deleteMethod: '',
                      deleteScript: '', // (string) A relative path to a delete script
                      // (object) extra parameters send on the delete ajax request
                      // see http://api.jquery.com/jquery.ajax/
                      fileDeleteOptions: {},
                      formData: {}, // DEPRECATED: Use fileUploadOptions instead
                      label: '<span class="fa fa-camera"></span>', // (string) A label for an image addon
                      uploadScript: null, // DEPRECATED: Use fileUploadOptions instead
                      preview: false, // (boolean) Show an image before it is uploaded (only in browsers that support this feature)
                      fileUploadOptions: {
                        // (object) File upload configuration.
                        // See https://github.com/blueimp/jQuery-File-Upload/wiki/Options
                        url: API_URL + '/upload/image', // (string) A relative path to an upload script
                        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i, // (regexp) Regexp of accepted file types
                        headers: {
                          'x-auth-token': this.authService.getAuthToken()
                        },
                      },
                      actions: { // (object) Actions for an optional second toolbar
                          remove: { // (object) Remove action configuration
                              label: '<span class="fa fa-times"></span>', // (string) Label for an action
                              clicked: function ($el) { // (function) Callback function called when an action is selected
                                  var $event = $.Event('keydown');

                                  $event.which = 8;
                                  $(document).trigger($event);   
                              }
                          }
                      },
                      messages: {
                          acceptFileTypesError: 'This file is not in a supported format: ',
                          maxFileSizeError: 'This file is too big: '
                      },
                      uploadCompleted: function ($el, data) {
                          console.log($el, data);
                      }, // (function) Callback function called when upload is completed
                      uploadFailed: function (uploadErrors, data) {
                          console.log(uploadErrors, data);
                      } // (function) Callback function called when upload failed
                  }
                }
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

                bodyEditor.setContent(converter.makeHtml(bodyMD), 0);
            }
            
            bodyEditor.subscribe('editableInput', onContentChangedFactory("body"));
            titleEditor.subscribe('editableInput', onContentChangedFactory("title"));
        };

        const initEditor = postId => {
            if (!postId) {
                alert("Editor cannot be initialized");
            }

            $("#description").tagit({
              afterTagAdded: function(event, ui) {
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

        const loadPostDraft = postId => {
            let url = API_URL;

            url += parentPostId ?
                `/draft?parentPostId=${parentPostId}` :
                postId ? `/post/${postId}` : "/draft";

            $http.get(url)
            .then(response => {
                $scope.draft = response.data;

                initEditor($scope.draft.id);
            }, err => {
                console.log(err);
            });
        };

        loadPostDraft(postId);
    }

    private titleEl: HTMLElement;

    static $inject = [ "$scope", "$http", "$timeout", "PostService", "AuthService", "API_URL" ];
}
