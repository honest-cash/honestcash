export default class MainCtrl {
    constructor(
        $rootScope, $scope, $state, $sce, $window, $location, $http, AuthService, HashtagService, PostService, $uibModal
    ) {
        $scope.hashtags = HashtagService.defaultHashtags;
    
        const mouseEnterAddress = (className, address) => {
            const container = document.getElementsByClassName(className)[0];
            
            container.innerHTML = "";
    
            new QRCode(container, address);
        };
    
        const addressClicked = (address) => {
            $('#tipModal').modal('show');
    
            const inputEl = document.getElementById("bchTippingAddress");
    
            inputEl.value = address;
            
            const qrContainer = document.getElementById("bchTippingAddressQR");
    
            qrContainer.innerHTML = "";
    
            new QRCode(qrContainer, address);
        };
    
        const mouseLeaveAddress = (className) => {
            const container = document.getElementsByClassName(className)[0];
    
            container.innerHTML = "";
        };
    
        $scope.addressClicked = addressClicked;
        $scope.mouseEnterAddress = mouseEnterAddress;
        $scope.mouseLeaveAddress = mouseLeaveAddress;
    
        $scope.showUpvotes = function(feed, statType) {
            PostService.getUpvotes(feed.id, function(rPostUpvotes) {
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'userListModal.html',
                    controller: 'userListCtrl',
                    resolve: {
                        statType: statType,
                        postId: feed.id,
                        stats: function() {
                            return {
                                upvotesCount: feed.upvotes_count,
                                viewsCount: feed.views_count,
                                commentsCount: feed.comment_count
                            };
                        },
                        postUpvotes: function() {
                            return rPostUpvotes;
                        }
                    }
                });
            });
        };
    
        $rootScope.trustSrc = (src) => {
            return $sce.trustAsResourceUrl(src);
        }
    
        $rootScope.searchVicigo = function(searchInput) {
            searchInput = searchInput.toLowerCase();
            searchInput = searchInput.replace('#', '');
            searchInput = searchInput.replace('@', '');
    
            return $http.get('/api/search?q=' + searchInput).then(function(response) {
                return response.data.map(function(item) {
                    return item;
                });
            });
        };
    
        $rootScope.searchResultSelected = function($item) {
            switch ($item.type) {
                case "profile":
                    $state.go("vicigo.profile", {
                        profileId: $item.objId
                    });
                    break;
                case "post":
                    $state.go("vicigo.post", {
                        postId: $item.objId
                    });
                    break;
                case "hashtag":
                    $state.go("vicigo.hashtag", {
                        hashtag: $item.objId
                    });
                    break;
                default:
            }
        };
    
        $scope.sort = function(sortType) {
            if (sortType == $scope.sortType) {
                $window.location.reload();
            } else {
                $scope.sortType = sortType;
                $scope.postsAvailable = true;
                $location.search('sort', $scope.sortType);
            }
        };
    
        $scope.newPhoto = function() {
            $('#uploadImageModal').modal('show');
            $('#uploadedImage').attr('src', null);
            $(".tags-area").tagit("removeAll");
            //imageDropzone.removeAllFiles(true);
            $(".dz-message").removeClass("hidden");
            $("#uploadedImage").addClass("hidden");
        };
    
        $scope.editPhoto = function(feed) {
            $('#uploadImageModal').modal('show'); //uploadExternalImageModal
            $('#uploadedImage').attr('src', feed.image_url);
    
            $(".dz-message").addClass("hidden");
            $("#uploadedImage").removeClass("hidden");
            document.getElementById("publishPicturePostBtn").disabled = false;
    
            $(".tags-area").tagit("removeAll");
            feed.hashtags = (feed.hashtags) ? feed.hashtags : [];
            for (var index = 0; index < feed.hashtags.length; index++) {
                $(".tags-area").tagit("createTag", feed.hashtags[index].hashtag);
            }
            $("#uploadedImagePostId").val(feed.id);
    
            imageDropzone.removeAllFiles(true);
        };
    
        $scope.displayFeedBody = PostService.displayHTML;
    
        $scope.getFeedLink = function(feed) {
            return "/post/" + feed.id;
        };
    
        $scope.hasTitle = function(post_type_id) {
            if (post_type_id == 4) {
                return false;
            } else {
                return true;
            }
        };
    
        $rootScope.publishPicturePost = function() {
            var postId = $("#uploadedImagePostId").val();
            var tags = $("#uploadedPictureTags").val();
            $('#uploadImageModal').modal('toggle');
    
            if (postId) {
                PostService.publishPic(postId, {
                    hashtags: tags
                }, function() {
                    $(".dz-message").removeClass("hidden");
                    $('#uploadedImage').attr('src', "");
                    $("#uploadedPictureTags").tagit("removeAll");
                    document.getElementById("publishPicturePostBtn").disabled = true;
                    $(".dz-message").removeClass("hidden");
                    $("#uploadedImage").addClass("hidden");
                });
            }
        };
    
        $rootScope.logoutMe = function() {
            AuthService.logout();
    
            
            $rootScope.user = false;
            $rootScope.fetchingNotifs = false;
    
            $state.go("vicigo.feeds");
        };
    }
}

MainCtrl.$inject = [
    "$rootScope",
    "$scope", 
    "$state",
    "$sce",
    "$window",
    "$location",
    "$http",
    "AuthService",
    "HashtagService",
    "PostService",
    "$uibModal"
];
