import MediumEditor from "medium-editor";
import * as async from "async";
import "medium-editor/dist/css/medium-editor.min.css";
import "medium-editor/dist/css/themes/default.min.css";
import "medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin.min.css";
import "medium-editor-insert-plugin";

export default class EditorCtrl {
    constructor($state, $scope, $stateParams, $http, $timeout, AuthService, API_URL) {
        let titleEditor;
        let bodyEditor;

        $scope.isLoading = false;
        $scope.draft = {};
        $scope.ready = false;
        $scope.Saving = {
            body: false,
            title: false
        };

        const parentPostId = $stateParams.parentPostId;

        const saveDraftElement = (element, cb) => {
            const post = {};

            post.title = document.getElementById("title").innerText || "";
            post.body = document.getElementById("body").innerHTML || "";
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
                    $state.go("vicigo.post", {
                        alias: publishedPost.alias,
                        username: publishedPost.user.username
                    });
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
                anchorPreview: false,
                paste: {
                    /* This example includes the default options for paste,
                       if nothing is passed this is what it used */
                    forcePlainText: true,
                    cleanPastedHTML: true,
                    cleanReplacements: [],
                    cleanAttrs: [ 'class', 'style', 'dir' ],
                    cleanTags: ['meta', 'dir', 'h1', 'h4', 'h5', 'h6', 'a', 'table', 'tr', 'td', 'ul', 'li', 'code', 'pre' ],
                    unwrapTags: []
                }
            });

            $('#body').mediumInsert({
                editor: editor
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
            
            var backgroundImageDropzone = new Dropzone("#backgroundImageDropzone", {
                url: "/upload/image?isBackground=true&postId="+postId,
                maxFiles: 10,
                thumbnailWidth: null,
                previewTemplate: document.querySelector('#preview-template').innerHTML,
                clickable: '#uploadPostBackground',
            })

            backgroundImageDropzone
            .on("sending", (file, xhr) => {
                $scope.isBeingUploaded = true;

                xhr.setRequestHeader("X-Auth-Token", AuthService.getAuthToken());
            })

            backgroundImageDropzone
            .on("success", (file, response) => {
                $scope.draft.post_image_url = response.link;
                $scope.$digest();
            });
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
            });
        };

        loadPostDraft($stateParams.postId);
    }
}

EditorCtrl.$inject = [ "$state", "$scope", "$stateParams", "$http", "$timeout", "AuthService", "API_URL" ];
