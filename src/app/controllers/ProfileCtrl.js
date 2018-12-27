export default class ProfileCtrl {
    constructor(API_URL, $rootScope, $state, $scope, $location, FeedService, RelsService, PostService, ProfileService, profile) {
        $scope.filter = (filterType) => {
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

        $scope.profile = profile;

        $scope.profileId = $scope.profile.id;
        $scope.hashtag = $location.search()["hashtag"] ? $location.search()["hashtag"] : null;
        $scope.page = 1;
        $scope.feeds = [];
        $scope.followGuys = [];
        $scope.showProfileTab = "feeds"; // following, // followers
        $scope.limit = 10;
        $scope.postsAvailable = true;
        $rootScope.isLoading = true;
        $scope.drafts = [];
        $scope.followedHashtags = [];
        $scope.followsProfileAlready = false;

        $scope.remove = function() {
            elt.html('');
        };

        $scope.unfollowHashtag = function(hashtag, index) {
            RelsService.unfollowHashtag(hashtag);
            $scope.followedHashtags.splice(index, 1);
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
                    data.forEach(function (feed) {
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

        $scope.showFeeds = function (tab) {
            $scope.hashtag = null;
            $scope.showProfileTab = "feeds";
        };

        $scope.showFollowers = (tab) => {
            $scope.followGuys = [];

            $scope.showProfileTab = "followers";

            RelsService.showFollowers($scope.profileId, function (rFollowers) {
                $scope.followGuys = rFollowers;
            });
        };

        $scope.showFollowing = (tab) => {
            $scope.followGuys = [];

            $scope.showProfileTab = "following";

            RelsService.showFollowing($scope.profileId, function (rFollowing) {
                $scope.followGuys = rFollowing;
                console.log($scope.followGuys);
            });
        };

        $scope.removePost = function (feed, isDraft, $index) {
            bootbox.confirm("Are you sure?", function (result) {
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
    "$state",
    "$scope",
    "$location",
    "FeedService",
    "RelsService",
    "PostService",
    "ProfileService",
    "profile"
];
