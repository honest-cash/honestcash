export default class ProfileCtrl {
    constructor(API_URL, $rootScope, $state, $scope, $location, $http, $q, FeedService, RelsService, PostService, ProfileService, profile) {
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

        const updateMutableProfileFieldFactory = (fieldName) => async (fieldValue) => {
            var d = $q.defer();

            const data = {};

            data[fieldName] = fieldValue;
            console.log(data);

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
        $scope.updateBio = updateMutableProfileFieldFactory("bio");
        $scope.updateTwitter = (fieldValue) => updateMutableProfileFieldFactory("props")({ twitter: fieldValue });
        $scope.updateReddit = (fieldValue) => updateMutableProfileFieldFactory("props")({ reddit: fieldValue });

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

        $scope.unfollow = (profileId, followGuy) => {
            if ($scope.profile.id === profileId) {
                $scope.profile.alreadyFollowing = false;
            } else {
                $scope.followGuys = $scope.followGuys.filter((guy) => guy.id !== profileId);
            }

            if (followGuy) {
                followGuy.alreadyFollowing = false;
            }

            RelsService.unfollowProfile(profileId);
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
    "$http",
    "$q",
    // "BitcoinService",
    "FeedService",
    "RelsService",
    "PostService",
    "ProfileService",
    "profile"
];
