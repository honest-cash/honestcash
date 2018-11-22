export default class FeedsCtrl {
  constructor($rootScope, $scope, $stateParams, $location, $http, FeedService, CommentService, PostService) {
        $scope.filter = filterType => {
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

		$scope.feedOnScreen = function(postId, index, inview, userId) {
			if ($scope.feeds[index].comment_count) {
				$http.get("/post/" + postId + "/comments/").then(function(response) {
					$scope.feeds[index].comments = response.data;
					$scope.feeds[index].showComments = true;
				});
			}

		};

		$scope.feeds = [];
		$scope.page = 1;
		$scope.limit = 10;
		$rootScope.isLoading = true;
		$scope.postsAvailable = true;

		$scope.hashtagFollowed = false;

		$scope.hashtag = $stateParams.hashtag;

		if ($scope.hashtag) {
			$http.get("/api/hashtag/" + $scope.hashtag).then(function(response) {
				
				$scope.hashtagInfo = response.data;
			});
		}

		$scope.sortType = "new";
		$scope.filterType = $location.search()["filter"] ? $location.search()["filter"] : null;
		$scope.recommendedHashtags = [];
		$scope.recommendedProfiles = [];

		$scope.fetchPost = function(postId, index) {
			$http.get("/post/" + postId).then(function(response) {
				$scope.feeds[index].body = response.data.post_body;
				$scope.feeds[index].isFull = true;
				
			});
		};

		$scope.removePost = function(feed, isDraft, $index) {
			bootbox.confirm("Are you sure?", function(result) {
				if (result) {
					PostService.removePost(feed.id);
					return (isDraft) ? $scope.drafts.splice($index, 1) : $scope.feeds.splice($index, 1);
				}
			});
		};

		$scope.fetchFeeds = () => FeedService.fetchFeeds({
			page: $scope.page,
			hashtag: $scope.hashtag,
			filter: $scope.filterType,
			algorithm: $scope.hashtag ? "none" : "feeds"
		}, (data) => {
			if (data) {
				data.forEach((feed) => {
					$scope.feeds.push(feed);
				});

				if (data.length < $scope.limit) {
					$scope.postsAvailable = false;
				} else {
					$scope.postsAvailable = true;
				}
			} else {
				$scope.postsAvailable = false;
			}
		});

		$scope.fetchFeeds();

		$scope.loadMore = function() {
			if (!$rootScope.activeCalls && $scope.postsAvailable) {
				$scope.page = $scope.page + 1;
				$scope.fetchFeeds();
			}
		};

		/* repeating */
		$scope.upvote = function(postId, index) {
			if (!$rootScope.user.id) {
				return $("#loginModal").modal();
			}

			$scope.feeds[index].alreadyUpvoted = true;
			$scope.feeds[index].upvotes_count = $scope.feeds[index].upvotes_count + 1;
			PostService.upvote(postId);
		};

		$scope.showComments = function(postId, index) {
			if ($scope.feeds[index].showComments) {
				$scope.feeds[index].showComments = false;
			} else {
				$scope.feeds[index].showComments = true;
				$http.get("/post/" + postId + "/comments/").then(function(response) {
					
					$scope.feeds[index].comments = response.data;
				});
			}
		};

		$scope.postComment = function(postId, body, index) {
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

		$scope.hashtagFollowed = true;
		if ($stateParams.hashtag && $rootScope.user) {
			$http.get("/api/hashtag/" + $stateParams.hashtag + "/follow").then(function(response) {
				$scope.hashtagFollowed = response.data.isFollowing;
			});
		}
		$scope.followHashtag = function(hashtag, index, list) {
			if (!$rootScope.user.id) {
				return $("#loginModal").modal()
			}

			if (index !== undefined) {
				$scope.recommendedHashtags.splice(index, 1);
			} else {
				$scope.hashtagFollowed = true;
			}

			$http.post("/api/hashtag/follow", {
				hashtag: hashtag
			});
		};

		$scope.unfollowHashtag = function(hashtag) {
			$scope.hashtagFollowed = false;
			$http.post("/api/hashtag/unfollow", {
				hashtag: hashtag
			});
		};
  }
}

FeedsCtrl.$inject = [ "$rootScope", "$scope", "$stateParams", "$location", "$http", "FeedService", "CommentService", "PostService" ];