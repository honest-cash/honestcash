
export default class ProfileCtrl {
    constructor(API_URL, $rootScope, $scope, $location, $http, $q, BitcoinService, FeedService, CommentService, RelsService, PostService, profile) {
        $scope.filter = function(filterType) {
            if (filterType == $scope.filterType) {
                $scope.filterType = null;
            } else {
                $scope.filterType = filterType;
            }

            $scope.postsAvailable = true;
            $location.search('filter', $scope.filterType);
            $scope.page = 1;
            $scope.feeds = [];
            $scope.fetchFeeds();
        };

        $(".tags-area").tagit({
            placeholderText: "place for hashtags!"
        });

        $scope.profile = profile;

        $scope.profileId = $scope.profile.id;
        $scope.hashtag = $location.search()["hashtag"] ? $location.search()["hashtag"] : null;
        $scope.page = 1;
        $scope.feeds = [];
        $scope.followGuys = [];
        $scope.showProfileTab = "feeds"; //following, //followers
        $scope.limit = 10;
        $scope.postsAvailable = true;
        $rootScope.isLoading = true;
        $scope.drafts = [];
        $scope.followedHashtags = [];

        $scope.fetchPost = (postId, index) => {
            $http.get("/post/" + postId).then(function(response) {
                $scope.feeds[index].body = response.data.post_body;
                $scope.feeds[index].isFull = true;
            });
        };

        $scope.unfollowHashtag = function(hashtag, index) {
            RelsService.unfollowHashtag(hashtag);
            $scope.followedHashtags.splice(index, 1);
        };

        const updateMutableProfileFieldFactory = (fieldName) => async (fieldValue) => {
            var d = $q.defer();

            const data = {};

            data[fieldName] = fieldValue;

            $http.put(`${API_URL}/user/${$scope.profile.id}`, data)
            .then((res) => {
                res = res || {};
                if (res.status === 'ok') { // {status: "ok"}
                    d.resolve()
                } else { // {status: "error", msg: "Username should be `awesome`!"}
                    d.resolve(res.msg)
                }
            }, (response) => {
                // toastr.warning(response.data.desc);

                d.resolve(response.data.desc);
            });

            return d.promise;
        };

        $scope.updateUsername = updateMutableProfileFieldFactory("username");
        $scope.updateAddressBCH = updateMutableProfileFieldFactory("addressBCH");

        $scope.clickProfilePic = (userId, profileId) => {
            if ($rootScope.user) {
                if (userId == profileId) {
                    $('#uploadProfilePicModal').appendTo("body").modal('show');
                }
            }
        };

        $scope.fetchFeeds = params => {
            params = params ? params : {};

            if (params && params.hashtag !== undefined) {
                $scope.hashtag = params.hashtag;
                $location.search('hashtag', $scope.hashtag);
            } else {
                if (!$scope.hashtag) {
                    $location.search('hashtag', null);
                } else {
                    params.hashtag = $scope.hashtag;
                }
            }

            if (!$scope.filterType) {
                $location.search('filter', null);
            } else {
                params.filter = $scope.filter;
            }

            $scope.showProfileTab = "feeds";

            FeedService.fetchFeeds({
                filter: params.filter,
                hashtag: params ? params.hashtag : null,
                page: params.page ? params.page : $scope.page,
                filter: $scope.filterType,
                algorithm: "none",
                userId: $scope.profileId
            }, data => {
                if (!data) {
                    return;
                }
                if (params.page === 0) {
                    $scope.feeds = data;
                } else {
                    data.forEach(function(feed) {
                        $scope.feeds.push(feed);
                    });
                }

                if (data.length < $scope.limit) {
                    $scope.postsAvailable = false;
                } else {
                    $scope.postsAvailable = true;
                }
            });
        };

        $scope.fetchFeeds({});

        $scope.showFeeds = function(tab) {
            $scope.hashtag = null;
            $scope.showProfileTab = "feeds";
        };

        $scope.showHashtags = function() {
            $scope.showProfileTab = "hashtags";
        };


        $scope.follow = function(profileId) {
            if (!$rootScope.user.id) {
                return $("#loginModal").modal();
            }
            $scope.profile.alreadyFollowing = true;
            RelsService.followProfile(profileId);
        };

        $scope.unfollow = function(profileId) {
            $scope.profile.alreadyFollowing = false;
            RelsService.unfollowProfile(profileId);
        };

        $scope.showFollowers = function(tab) {
            $scope.showProfileTab = "followers";
            RelsService.showFollowers($scope.profileId, function(rFollowers) {
                $scope.followGuys = rFollowers;
            });
        };

        $scope.showFollowing = function(tab) {
            $scope.showProfileTab = "following";
            RelsService.showFollowing($scope.profileId, function(rFollowing) {
                $scope.followGuys = rFollowing;
            });
        };

        /* repeting */
        $scope.upvote = function(postId, index) {
            if (!$rootScope.user.id) {
                return $("#loginModal").modal();
            }
            $scope.feeds[index].upvotes_count = $scope.feeds[index].upvotes_count + 1;
            $scope.feeds[index].alreadyUpvoted = true;
            PostService.upvote(postId);
        };



        $scope.showComments = (postId, index) => {
            if ($scope.feeds[index].showComments) {
                $scope.feeds[index].showComments = false;
            } else {
                CommentService.getComments($scope.postId, function(rComments) {
                    $scope.feeds[index].comments = rComments;
                    $scope.feeds[index].showComments = true;
                });
            }
        };

        $scope.postComment = (postId, body, index) => {
            var comment = {};
            comment.postId = postId;
            comment.body = body;
            $scope.feeds[index].showComments = true;
            $scope.feeds[index].commentDraft = "";
            CommentService.postComment(postId, body, function(rComment) {
                if ($scope.feeds[index].comments) {
                    $scope.feeds[index].comments.unshift(rComment);
                } else {
                    $scope.feeds[index].comments = [rComment];
                }
            });
        };

        $scope.deleteComment = function(postId, commentId, feedIndex, commentIndex) {
            $scope.feeds[feedIndex].comments.splice(commentIndex, 1);
            CommentService.deleteComment(postId, commentId);
        };

        $scope.removePost = function(feed, isDraft, $index) {
            bootbox.confirm("Are you sure?", function(result) {
                if (result) {
                    if (isDraft) $scope.drafts.splice($index, 1);
                    else $scope.feeds.splice($index, 1);
                    PostService.removePost(feed.id);
                }
            });
        };

        $scope.loadMore = () => {
            if (!$rootScope.activeCalls && $scope.postsAvailable) {
                $scope.page = $scope.page + 1;
                $scope.fetchFeeds({
                    page: $scope.page
                });
            }
        };
    }
}

ProfileCtrl.$inject = [
    "API_URL",
    "$rootScope",
    "$scope",
    "$location",
    "$http",
    "$q",
    "BitcoinService",
    "FeedService",
    "CommentService",
    "RelsService",
    "PostService",
    "profile" 
];
