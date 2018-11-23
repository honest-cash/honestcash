import MediumEditor from "medium-editor";
import "medium-editor/dist/css/medium-editor.min.css";

export default class EditorCtrl {
    constructor($state, $scope, $stateParams, $http, $timeout, ViciAuth, API_URL) {
        let titleEditor;
        let bodyEditor;

        $scope.isLoading = false;
        $scope.draft = {};
        $scope.ready = false;
        $scope.Saving = {
            body: false,
            title: false
        };

        const saveDraftElement = (element) => {
            const post = {};

            post.title = document.getElementById("title").innerText || "";
            post.body = document.getElementById("body").innerHTML || "";
            post.hashtags = $("input#description").val() || "";

            if (!post.body && !post.title && !post.hashtags) {
                $scope.saving = null;

                return false;
            }

            $http.put(API_URL + "/draft/" + $scope.draft.id + "/" + element, post)
            .then((response) => {
                $scope.saving = null;

                return toastr.success("Draft has been saved.");
            });
        };

        $scope.saveDraftElement = saveDraftElement;

        $scope.readyToPublish = () => {
            $('#publishModal').modal('show');
        };

        $scope.publishPost = postId => {
            if ($scope.isLoading === true) {
                return toastr.info("Saving...");
            }

            $scope.isLoading = true;

            $http.put(API_URL + "/draft/" + postId + "/publish")
            .then(response => {
                console.log(response);
                $scope.isLoading = false;

                if (response.status == 200) {
                    toastr.success("You have successfully published your story.");

                    return $timeout(() => {
                        $state.go("vicigo.postById", {
                            postId: postId
                        });
                    }, 1500);
                }

                toastr.warning(JSON.stringify(response.data));
            }, response => {
                $scope.isLoading = false;

                if (response.status == 400) {
                    if (response.data.code == "POST_TOO_SHORT") {
                        return toastr.info("Your story is too short. The minimum number of characters is 300.");
                    }

                    if (response.data.code == "TITLE_TOO_SHORT") {
                        return toastr.info("Title is too short.");
                    }
                }

                toastr.warning(response.data.code);
            });
        };

        const onContentChangedFactory = (element) => () => {
            if ($scope.Saving.body) {
                clearTimeout($scope.Saving.body);
            }

            $scope.Saving.body = setTimeout(() => {
                $scope.saveDraftElement(element);
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
                disableReturn: true,
                paste: {
                    forcePlainText: true,
                    cleanPastedHTML: true,
                    cleanReplacements: [],
                    cleanAttrs: [ 'class', 'style', 'dir' ],
                    cleanTags: [ 'meta' ],
                    unwrapTags: []
                }
            });

            bodyEditor = new MediumEditor('#body', {
                placeholder: {
                    /* This example includes the default options for placeholder,
                       if nothing is passed this is what it used */
                    text: 'Tell your story...',
                    hideOnClick: true
                },
                paste: {
                    /* This example includes the default options for paste,
                       if nothing is passed this is what it used */
                    forcePlainText: true,
                    cleanPastedHTML: true,
                    cleanReplacements: [],
                    cleanAttrs: ['class', 'style', 'dir'],
                    cleanTags: ['meta'],
                    unwrapTags: []
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
                        $scope.saveDraftElement("hashtags");
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

                xhr.setRequestHeader("X-Auth-Token", ViciAuth.getAuthToken());
            })

            backgroundImageDropzone
            .on("success", (file, response) => {
                $scope.draft.post_image_url = response.link;
                $scope.$digest();
            });
        };

        const loadPostDraft = postId => {
            $http.get(`${API_URL}${postId ? "/post/" + postId : "/draft"}`)
            .then(response => {
                $scope.draft = response.data;

                initEditor($scope.draft.id);
            });
        };

        loadPostDraft($stateParams.postId);
    }
}

EditorCtrl.$inject = [ "$state", "$scope", "$stateParams", "$http", "$timeout", "ViciAuth", "API_URL" ];
