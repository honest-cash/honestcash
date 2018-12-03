import MediumEditor from "medium-editor";
import * as async from "async";
import "medium-editor/dist/css/medium-editor.min.css";
import "medium-editor/dist/css/themes/default.min.css";
import "medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin.min.css";

export default class EditorCtrl {
    constructor($scope, $http, $timeout, AuthService, API_URL) {
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

        const saveDraftElement = (element, cb) => {
            const post = {};
          
            post.body = bodyEditor.serialize().body.value;
            post.title = document.getElementById("title").innerText || "";
            post.hashtags = $("input#description").val() || "";

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

        $scope.readyToPublish = () => {
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
                            return toastr.warning("Your story is too short. The minimum number of characters is 300.");
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

        const initMediumEditor = (title, body) => {
            titleEditor = new MediumEditor('#title', {
                toolbar: false,
                buttons: [],
                placeholder: {
                    /* This example includes the default options for placeholder,
                       if nothing is passed this is what it used */
                    text: 'Title',
                    hideOnClick: true
                },
                disableDoubleReturn: true,
                disableReturn: true,
                paste: {
                    forcePlainText: true,
                    cleanPastedHTML: true,
                    cleanReplacements: [],
                    cleanAttrs: [ 'class', 'style' ],
                    cleanTags: [ 'meta' ],
                    unwrapTags: []
                }
            });

            bodyEditor = new MediumEditor('#body', {
                buttonLabels: 'fontawesome',
                autoLink: true,
                placeholder: {
                    /* This example includes the default options for placeholder,
                       if nothing is passed this is what it used */
                    text: 'Tell your story...',
                    hideOnClick: true
                },
                toolbar: {
                    buttons: ['bold', 'italic', 'underline', "anchor", 'h2', 'h3', {
                        name: 'pre',
                        contentDefault: 'code snippet', // default text
                        contentFA: '<i class="fa fa-code"></i>' // custom icon if you're using font-awesome icons
                    }]
                },
                anchorPreview: false,
                paste: {
                    /* This example includes the default options for paste,
                       if nothing is passed this is what it used */
                    forcePlainText: true,
                    cleanPastedHTML: true,
                    cleanReplacements: [],
                    cleanAttrs: [ 'class', 'style', 'dir' ],
                    cleanTags: ['meta', 'dir', 'h1', 'h4', 'h5', 'h6', 'a', 'table', 'tr', 'td', /** 'ul', 'li', 'code', 'pre' */ ],
                    unwrapTags: []
                }
            });

            $('#body').mediumInsert({
                editor: bodyEditor,
                addons: { // (object) Addons configuration
                    images: { // (object) Image addon configuration
                        label: '<span class="fa fa-camera"></span>', // (string) A label for an image addon
                        uploadScript: null, // DEPRECATED: Use fileUploadOptions instead
                        deleteScript: '', // (string) A relative path to a delete script
                        deleteMethod: '',
                        fileDeleteOptions: {}, // (object) extra parameters send on the delete ajax request, see http://api.jquery.com/jquery.ajax/
                        preview: true, // (boolean) Show an image before it is uploaded (only in browsers that support this feature)
                        captions: true, // (boolean) Enable captions
                        captionPlaceholder: 'Type caption for image (optional)', // (string) Caption placeholder
                        autoGrid: 3, // (integer) Min number of images that automatically form a grid
                        formData: {}, // DEPRECATED: Use fileUploadOptions instead
                        fileUploadOptions: { // (object) File upload configuration. See https://github.com/blueimp/jQuery-File-Upload/wiki/Options
                            url: API_URL + '/upload/image', // (string) A relative path to an upload script
                            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i, // (regexp) Regexp of accepted file types
                            headers: {
                                'x-auth-token': AuthService.getAuthToken()
                            },
                        },
                        styles: { // (object) Available image styles configuration
                            wide: { // (object) Image style configuration. Key is used as a class name added to an image, when the style is selected (.medium-insert-images-wide)
                                label: '<span class="fa fa-align-justify"></span>', // (string) A label for a style
                                added: function ($el) {}, // (function) Callback function called after the style was selected. A parameter $el is a current active paragraph (.medium-insert-active)
                                removed: function ($el) {} // (function) Callback function called after a different style was selected and this one was removed. A parameter $el is a current active paragraph (.medium-insert-active)
                            },
                            left: {
                                label: '<span class="fa fa-align-left"></span>'
                            },
                            right: {
                                label: '<span class="fa fa-align-right"></span>'
                            },
                            grid: {
                                label: '<span class="fa fa-th"></span>'
                            }
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

            if (body) {
                document.getElementById("body").setAttribute("data-placeholder", "");
                bodyEditor.setContent(body, 0);
            }

            bodyEditor.subscribe('editableInput', onContentChangedFactory("body"));
            titleEditor.subscribe('editableInput', onContentChangedFactory("title"));
        }

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

            const hashtags = $scope.draft.userPostHashtags;

            hashtags.forEach((hashtag) => {
                $("#description").tagit("createTag", hashtag.hashtag);
            });
           
            initMediumEditor($scope.draft.title, $scope.draft.body);

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
}

EditorCtrl.$inject = [ "$scope", "$http", "$timeout", "AuthService", "API_URL" ];
