export default class EditorCtrl {
    constructor($state, $scope, $stateParams, $http, $timeout, ViciAuth, API_URL) {
        $scope.draft = {};
        $scope.ready = false;
        $scope.Saving = {
            body: false,
            title: false
        };

        $scope.publishPost = postId => {
            $http.put(API_URL + "/draft/" + postId + "/publish")
            .then(response => {
                if (response.status == 400) {
                    if (response.data.code == "POST_TOO_SHORT") {
                        return toastr.info("Your story is too short. The minimum number of characters is 300.");
                    }
                }

                if (response.status == 200) {
                    toastr.success("You have successfully published your story.");

                    return $timeout(() => {
                        $state.go("vicigo.post", {
                            postId: postId
                        });
                    }, 1500);
                }

                return toastr.warning(JSON.stringify(response.data));
            }, response => {
                return toastr.warning(response.data.code);
            });
        };
	
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

            $('#title').froalaEditor({
                key: 'krlenofG5hcj1==',
                toolbarInline: true,
                charCounterMax: 50,
                countCharacters: true,
                alwaysVisible: false,
                buttons: [],
                allowComments: false,
                allowScript: false,
                allowStyle: false,
                plainPaste: true,
                allowedAttrs: [],
                placeholderText: "Title"
            });


            $('#body').froalaEditor({
                key: 'krlenofG5hcj1==',
                imageUploadURL: "/upload/image?postId=" + postId,
                heightMin: 260,
                imageDefaultWidth: 640,
                imagePaste: false,
                toolbarButtons: ['bold', 'italic', 'underline', 'insertLink', 'insertImage', 'insertVideo', 'quote', 'insertHR', "html"],
                requestHeaders: {
                    "X-Auth-Token": ViciAuth.getAuthToken()
                },
                placeholder: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            })

            $('#body').froalaEditor('html.set', $scope.draft.body ? $scope.draft.body : "");

            $('#body').on('froalaEditor.contentChanged', (e, editor) => {
                if ($scope.Saving.body) {
                    clearTimeout($scope.Saving.body);
                }

                $scope.Saving.body = setTimeout(() => {
                    $scope.saveDraftElement("body");
                }, 1500);
            });

            $('#title').froalaEditor('html.set', $scope.draft.title ? $scope.draft.title : "");

            $('#title').on('froalaEditor.contentChanged', (e, editor) => {
                if ($scope.Saving.title) {
                    clearTimeout($scope.Saving.title);
                }

                $scope.Saving.title = setTimeout(() => {
                    $scope.saveDraftElement("title");
                }, 1500);
            });

            var backgroundImageDropzone = new Dropzone("#backgroundImageDropzone", {
                url: "/upload/image?isBackground=true&postId="+postId,
                maxFiles: 10,
                thumbnailWidth: null,
                previewTemplate: document.querySelector('#preview-template').innerHTML,
                clickable: '#uploadPostBackground',
            })

            backgroundImageDropzone
            .on("sending", (file, xhr) => {
                xhr.setRequestHeader("X-Auth-Token", ViciAuth.getAuthToken());
            })

            backgroundImageDropzone
            .on("success", (file, response) => {
                $scope.draft.post_image_url = response.link;
                $scope.$digest();
            });

            $scope.ready = true;
        };

        const loadPostDraft = postId => {
            $http.get(`${API_URL}${postId ? "/post/" + postId : "/draft"}`)
            .then(response => {
                $scope.draft = response.data;

                initEditor($scope.draft.id);
            });
        };

        $scope.saveDraftElement = (element) => {
            const post = {};

            post.title = $("#title").froalaEditor('html.get') ? $("#title").froalaEditor('html.get') : null;
            post.body = $("#body").froalaEditor('html.get') ? $("#body").froalaEditor('html.get') : null;
            post.hashtags = $("input#description").val();

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

        $scope.saveDraft = (draftId) => {
            const draft = {};

            draft.title = $("#title").froalaEditor('html.get') ? $("#title").froalaEditor('html.get') : "";
            draft.hashtags = $("#description").val() ? $("#description").val() : "";
            draft.body = $("#body").froalaEditor('html.get') ? $("#body").froalaEditor('html.get') : "";

            $http.post(API_URL + "/draft/" + draftId, draft)
            .then(function(data) {
                toastr.success("Draft has been saved.");
            });
        };

        loadPostDraft($stateParams.postId);
    }
}
