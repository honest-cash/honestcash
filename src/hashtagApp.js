import './styles/style.css';

// import angular from 'angular';
import 'jquery';
import uiRouter from 'angular-ui-router';
import infiniteScroll from  'ng-infinite-scroll';
import ProfileCtrl from './controllers/ProfileCtrl';
import FeedService from './services/FeedService';
import FeedsCtrl from './controllers/FeedsCtrl';
import WelcomeCtrl from './controllers/WelcomeCtrl';
import DraftsCtrl from './controllers/DraftsCtrl';
import EditorCtrl from './controllers/EditorCtrl';
import routingConfig from './config/routing';
import httpConfig from './config/http';
import stateConfig from './config/state';
import feedComponent from './components/feed/component';
import AuthModule from './AuthModule';
import HashtagService from './services/HashtagService';
import PostCtrl from './controllers/PostCtrl';
import PostService from './services/PostService';

import * as runs from './runs/runs';

AuthModule();

var imageDropzone, profilePicDropzone, hashbookBGDropzone;
var vicigoApp = angular.module("hashtag-app", [
	uiRouter,
	'ui.bootstrap',
	infiniteScroll,
	"dcbImgFallback", 
	"xeditable",
	'ngDialog',
	"angular.lazyimg",
	"ViciAuth"
])

.constant("API_URL", "https://honestcash.alphateamhackers.com/api") 

.run([ "API_URL", "ViciAuth", "Uploader", function(API_URL, ViciAuth, Uploader) {
	Uploader.init();

	profilePicDropzone = new Dropzone("#profilePicDropzone", {
		url: `${API_URL}/upload/image?isProfileAvatar=true`,
		maxFiles: 10,
		maxfilesexceeded: (file) => {
			this.removeAllFiles();
			this.addFile(file);
		},
		thumbnailWidth: null,
		previewTemplate: document.querySelector('#preview-template').innerHTML,
	})
	.on("sending", (file, xhr) => {
		xhr.setRequestHeader("X-Auth-Token", ViciAuth.getAuthToken());

		setTimeout(() => $('#uploadProfilePicModal').modal('hide'), 500);
	})
	.on("success", (file, response) => {
		document.getElementById("profilePic").src = response.url;
	});
}])

.run([ "$rootScope", "$state", "$timeout", "$http", function($rootScope, $state, $timeout, $http) {
	/**
	var fetchNotifs = function() {
		$http.get("/api/notifications/status").then(function(response) {
			$rootScope.userStatus = response.data;
			return;
		});
	};

	$rootScope.$on("notAuthenticated", function() {
		var WhiteListed = [ "starter.welcome", "vicigo.post", "vicigo.postByAlias", "vicigo.hashbook", "vicigo.hashtag" ];
		if (WhiteListed.indexOf($state.current.name) == -1) {
			$state.go("starter.welcome");
		}
	});
	*/
}])

.run([ "editableOptions", function(editableOptions) {
	editableOptions.theme = 'bs3';
}])

.config([ "$locationProvider", "$urlMatcherFactoryProvider", routingConfig ])
.config([ "$httpProvider", httpConfig])
.config([ "$stateProvider", "$urlRouterProvider", stateConfig ])

.service('HashtagService', HashtagService)

.service('MetaService', function() {
	var metaDefault = {
		title: "Honest.Cash",
	};
	var meta = metaDefault;

	var set = function(key, value) {
		meta[key] = value;
	};

	return {
		setDefault: function() {
			meta = metaDefault;
			return true;
		},

		setForPost: function(post) {
			set("author", post.author_name);
			var desc = post.hashtags.map(function(item) {
				return item.hashtag;
			}).join(", ");
			if (post.post_type_id == 4 || post.post_type_id == 5) {
				set("title", "Image on Vicigo by @" + post.author_name + " | Vicigo");
				set("ogTitle", "Image on Vicigo by @" + post.author_name);
				set("twitterTitle", "Image on Vicigo by @" + post.author_name);
				set("ogUrl", "https://vicigo.com/post/" + post.post_id);

				set("description", desc);
				set("keywords", desc);
				set("ogDescription", desc);
				set("twitterDescription", desc);
			} else {
				set("title", post.post_title + " by @" + post.author_name + " |  Vicigo");
				set("ogTitle", post.post_title + " by @" + post.author_name);
				set("twitterTitle", post.post_title + " by @" + post.author_name);


				set("description", desc);
				set("keywords", desc);
				set("ogDescription", desc);
				set("twitterDescription", desc);
			}

			set("ogImage", (post.post_image_url) ? post.post_image_url : metaDefault.ogImage);
			return true;
		},

		setForHashtag: function(hashtag) {
			meta = metaDefault;
			var title = "#" + hashtag + " | Vicigo photos and articles";
			var desc = "Photos, posts and articles with the hashtag '" + hashtag + "' on Vicigo.";
			set("ogUrl", "https://vicigo.com/hashtag/" + hashtag);
			set("title", title);
			set("ogTitle", title);
			set("twitterTitle", title);

			set("description", desc);
			set("keywords", desc);
			set("ogDescription", desc);
			set("twitterDescription", desc);
			return true;
		},

		setForProfile: function(profile) {
			meta = metaDefault;
			var keywords = profile.hashtags.map(function(item) {
				return item.hashtag;
			}).join(", ");
			var title = "@" + profile.name;
			title += (profile.title) ? (", " + profile.title) : "";
			title += "  | Vicigo";

			var desc = "The newest photos and articles from @" + profile.name + "."
			desc += (profile.title) ? " " + profile.title : "";
			desc += " " + keywords;

			set("title", title);
			set("ogTitle", title);
			set("twitterTitle", title);
			set("ogUrl", "https://vicigo.com/profile/" + profile.user_id);
			set("description", desc);
			set("keywords", keywords);
			set("ogDescription", desc);
			set("twitterDescription", desc);
			return true;
		},

		display: function(key) {
			return meta[key];
		},
	}
})

.service("Uploader", [ "ViciAuth", function(ViciAuth) {
	var PATHS = {
		IMAGE: "/upload/image"
	};

	var changeProgress = function(progressValue) {
		document.getElementById("imageUploadProgressBar").setAttribute("aria-valuenow", progressValue);
		document.getElementById("imageUploadProgressBar").style.width = progressValue + "%";
	}

	var init = function() {
		imageDropzone = new Dropzone("body", {
				url: PATHS.IMAGE,
				maxFiles: 10,
				thumbnailWidth: null,
				previewTemplate: document.querySelector('#preview-template').innerHTML,
				clickable: '#imageDropzone',
			})
			.on("addedfile", function(file) {
				$('#uploadImageModal').modal('show');
				$('#uploadedImage').attr('src', null);
				$(".tags-area").tagit("removeAll");
				//imageDropzone.removeAllFiles(true);
				$(".dz-message").removeClass("hidden");
				$("#uploadedImage").addClass("hidden");
			})
			.on("sending", function(file, xhr) {
				changeProgress(0);
				$("#imageUploadProgress").removeClass("hidden");
				xhr.setRequestHeader("X-Auth-Token", ViciAuth.getAuthToken());
			}).on("uploadprogress", function(file, progress) {
				changeProgress(progress);
			}).on("success", function(file, response) {
				changeProgress(100);
				setTimeout(function() {
					$("#imageUploadProgress").addClass("hidden");
				}, 500);

				document.getElementById("uploadedImage").src = response.link;
				$("#uploadedImagePostId").val(response.postId)
				document.getElementById("publishPicturePostBtn").disabled = false;
				$(".dz-message").addClass("hidden");
				$("#uploadedImage").removeClass("hidden");
			});
	};

	return {
		init: init
	};
}])

.service("CommentService", [ "$http", function($http) {
	var deleteComment = function(postId, commentId) {
		$http.delete("/post/" + postId + "/comments/" + commentId).then(function(response) {
		});
	};

	var getComments = function(postId, callback) {
		$http.get("/post/" + postId + "/comments").then(function(response) {
			callback(response.data);
		});
	};

	var postComment = function(postId, commentBody, callback) {
		if (!postId || !commentBody) {
			return
		}
		var comment = {
			postId: postId,
			body: commentBody,
		};
		$http.post("/post/" + postId + "/comments/", comment).then(function(response) {
			callback(response.data);
		});
	}

	return {
		postComment: postComment,
		getComments: getComments,
		deleteComment: deleteComment
	};
}])

.service("RelsService", [ "$http", "API_URL", function($http, API_URL) {
	var followProfile = function(profileId) {
		$http.post(API_URL + "/api/profile/" + profileId + "/follow/").then(function(response) {
			
		});
	};
	var unfollowProfile = function(profileId) {
		$http.post(API_URL + "/api/profile/" + profileId + "/unfollow/").then(function(response) {
			
		});
	};

	var showFollowers = function(profileId, callback) {
		$http.get(API_URL + "/api/profile/" + profileId + "/followers").then(function(response) {
			
			callback(response.data);
		});
	};

	var showFollowing = function(profileId, callback) {
		$http.get(API_URL + "/api/profile/" + profileId + "/following").then(function(response) {
			
			callback(response.data);
		});
	};

	var followHashtag = function(hashtag) {
		$http.get(API_URL + "/api/hashtag/" + hashtag + "/follow").then(function(response) {
			
		});
	};

	var unfollowHashtag = function(hashtag) {
		$http.get(API_URL + "/api/hashtag/" + hashtag + "/unfollow").then(function(response) {
			
		});
	};

	var showFollowedHashtags = function(profileId, callback) {
		$http.get(API_URL + "/api/profile/" + profileId + "/hashtags/following").then(function(response) {
			
			callback(response.data)
		});
	};

	return {
		followHashtag: followHashtag,
		unfollowHashtag: unfollowHashtag,
		followProfile: followProfile,
		unfollowProfile: unfollowProfile,
		showFollowing: showFollowing,
		showFollowers: showFollowers,
		showFollowedHashtags: showFollowedHashtags,
	};
}])

.service("PostService", PostService)
.service("FeedService", FeedService)

.factory('AuthInterceptor', [ "$rootScope", "$q", function($rootScope, $q) {
	if ($rootScope.activeCalls == undefined) {
		$rootScope.activeCalls = 0;
	}

	return {
		request: function(config) {
			$rootScope.activeCalls += 1;
			return config;
		},
		requestError: function(rejection) {
			$rootScope.activeCalls -= 1;
			return $q.reject(rejection);
		},
		response: function(response) {
			$rootScope.activeCalls -= 1;
			return response;
		},
		responseError: function(response) {
			$rootScope.activeCalls -= 1;
			if (response.status == 400 && response.data) {
				if (response.data.code == "POST_TOO_SHORT") {
					toastr.info("Post is too short. The minimal amount of charackters is 300. Current: " + response.data.textLength);
				}
			}

			if (response.status == 401) {
				$rootScope.$broadcast("notAuthenticated");
			}

			return $q.reject(response);
		}
	};
}])

.controller("appController", [ "$scope", "ViciAuth", function($scope, ViciAuth) {
	$scope.AUTH_TOKEN = ViciAuth.getAuthToken();
}])

.controller("blogController", [
	"$rootScope", "$stateParams", "$scope", "$http", "CommentService", "PostService",
	function($rootScope, $stateParams, $scope, $http, CommentService, PostService) {
		$scope.blogSlug = $stateParams.blogSlug;
		$scope.blog = {};

		$scope.followHashbook = function(hashbook) {
			if (!$rootScope.user.id) {

				bootbox.prompt("<b>What is your email?</b>", function(result) {
					$http.post("/api/hashbook/" + hashbook.blog_id + "/follow?medium=email&source=hashbook_page", {
						email: result
					})
				});
			} else {
				$http.post("/api/hashbook/" + $scope.blog.blog_id + "/follow?medium=vicigo&source=hashbook_page").then(function(response) {
					$scope.blog.blogFollowed = true;
					
				});
			}
		};

		$http.get("/api/hashbook/" + $scope.blogSlug).then(function(response) {
			$scope.blog = response.data;
		});

		hashbookBGDropzone = new Dropzone("#hashbookBGDropzone", {
			url: "/upload/image?isBackground=true&hashbookId="+$scope.blog.blog_id,
			maxFiles: 1,
			thumbnailWidth: null,
			previewTemplate: document.querySelector('#preview-template').innerHTML,
			clickable: '#hashbookBGDropzone'
		});
		hashbookBGDropzone.on("success", function(file, response) {
			$scope.blog.bg_picture = response.link;
		});

		/* repeting */
		$scope.upvotePost = function(postId, index) {
			if (!$rootScope.user.id) {
				return $("#loginModal").modal();
			}
			$scope.blog.posts[index].upvotes_count = $scope.blog.posts[index].upvotes_count + 1;
			$scope.blog.posts[index].alreadyUpvoted = true;
			PostService.upvote(postId);
		};

		$scope.showComments = function(postId, index) {
			if ($scope.feeds[index].showComments) {
				$scope.feeds[index].showComments = false;
			} else {
				CommentService.getComments(postId, function(rComments) {
					$scope.feeds[index].showComments = true;
					$scope.feeds[index].comments = rComments;
				});
			}
		};

		$scope.postComment = function(postId, body, index) {

			$scope.feeds[index].commentDraft = "";
			CommentService.postComment(postId, body, function(rComment) {
				$scope.feeds[index].showComments = true;
				$scope.feeds[index].comments.unshift(rComment);
			});
		};

		$scope.deleteComment = function(postId, commentId, feedIndex, commentIndex) {
			$scope.feeds[feedIndex].comments.splice(commentIndex, 1);
			CommentService.deleteComment(postId, commentId);
		};
	
		$scope.displayPostBody = PostService.displayHTML;
	}])
.controller("blogEditController", [
	"$stateParams", "$scope", "$state", "$http", function($stateParams, $scope, $state, $http) {
	$(".tags-area").tagit();

	$scope.blogSlug = $stateParams.blogSlug;
	$scope.blog = {};

	$http.get("/api/hashbook/" + $scope.blogSlug + "?fields=hashtags").then(function(response) {
		$scope.blog = response.data;
		var hashtags = $scope.blog._hashtags;
		for (var index = 0; index < hashtags.length; index++) {
			$(".tags-area").tagit("createTag", hashtags[index].hashtag);
		}
	});

	$scope.updateBlog = function(data) {
		data = {
			title: data.blog_title,
			desc: data.blog_desc,
			hashtags: data.hashtags
		};

		$http.put("/api/hashbook/" + $scope.blogSlug, data).then(function(response) {
			
			$state.go("hashbook.list", {
				blogSlug: $scope.blogSlug
			});
		}, function(response) {
			
		});
	};
}])
.controller("blogNewController", [ "$scope", "$state", "$http", function($scope, $state, $http) {
	$(".tags-area").tagit({
		placeholderText: "place for hashtags!"
	});

	$scope.blog = {
		slug: null,
		title: null,
		desc: null,
		hashtags: null,
		type: "blog"
	};

	$scope.createBlog = function(blog) {
		if (!blog.title) {
			return false;
		}
		if (!blog.hashtags) {
			return false;
		}

		$http.post("/api/hashbook", blog).then(function(response) {
			
			$scope.data = response.data;
			$state.go("hashbook.list", {
				blogSlug: $scope.blog.slug
			});
		});
	}
}])
.controller("importController", ["$scope", "$http", function($scope, $http) {
	$(".tags-area").tagit({
		placeholderText: "place for hashtags!"
	});

	$scope.data = [];
	$scope.activePost = false;
	$http.get("/api/external_services/fb/fetch_photos").then(function(response) {
		
		$scope.data = response.data;
	});

	$scope.selectedImageUrl = "";
	$scope.tagExternalPost = function(item) {
		$('#uploadExternalImageModal').modal('show');
		$scope.selectedImageUrl = item.source;
		$scope.activePost = item;
	};

	$scope.publishExternalPost = function() {
		var index = $scope.data.indexOf($scope.activePost);
		$scope.data.splice(index, 1);

		$('#uploadExternalImageModal').modal('hide');
		var hashtags = $("#hashtagsForImportedPhoto").val();

		var post = angular.copy($scope.activePost);

		post.tags = hashtags;
		$http.post("/post/image/from_link", post).then(function(response) {
			$(".tags-area2").tagit("removeAll");
		});
	};
}])

.controller("userListCtrl", [
	"$rootScope", "$scope", "$uibModalInstance", "postId", "stats", "PostService",
	function($rootScope, $scope, $uibModalInstance, postId, stats, PostService) {
		$scope.stats = stats;

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};


		$scope.showItems = function(type) {
			$scope.statType = type;
			if (type == "upvotes") {
				PostService.getUpvotes(postId, function(rPostUpvotes) {
					$scope.items = rPostUpvotes;
				});

			}
			if (type == "views") {
				PostService.getViews(postId, function(rPostViews) {
					$scope.items = rPostViews;
				});
			}
		};

		if (stats.upvotesCount) {
			$scope.showItems("upvotes");
		} else {
			$scope.showItems("views");
		}

		$rootScope.$on('$stateChangeStart', function() {
			$scope.cancel();
		});
	}])

	.controller("mainController", [
		"$rootScope",
		"$scope", 
		"$state",
		"$sce",
		"$window", "$location", "$http", "ViciAuth", "HashtagService", "MetaService", "PostService", "$uibModal",
	function(
		$rootScope, $scope, $state, $sce, $window, $location, $http, ViciAuth, HashtagService, MetaService, PostService, $uibModal
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

		$rootScope.MetaService = MetaService;

		$rootScope.trustSrc = (src) => {
			return $sce.trustAsResourceUrl(src);
		}

		$scope.goToPost = (feed) => {
			console.log(feed);

			$state.go("vicigo.post", {
				postId: feed.id,
				alias: feed.alias,
				username: feed.user.username
			});
		};

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
			ViciAuth.logout();

			
			$rootScope.user = false;
			$rootScope.fetchingNotifs = false;

			$state.go("starter.welcome");
		};
	}])

.controller("postController", PostCtrl)
.controller("profileBlogsController", [
	"$scope", "$stateParams", "$http",
	function($scope, $stateParams, $http) {
	$scope.blogs = [];
	$scope.profileIdentifier = $stateParams.profileIdentifier;

	$scope.deleteHashbook = function(blogId, blogSlug, $index) {

		bootbox.prompt("Do you really want to delete this Hashbook? You will not be able to revoke it. Write <b>'" + blogSlug.toUpperCase() + "'</b> to confirm.", function(result) {
			if (!result) return;
			if (result.toUpperCase() == blogSlug.toUpperCase()) {
				bootbox.confirm("Do you really really want irrevocablly to delete it? Sure? Second thoughts?", function(result) {
					if (result) {
						$http.delete("/api/hashbook/" + blogSlug);
						return $scope.blogs.splice($index, 1);
					} else {
						return;
					}

				});
			}
		});

	};

}])

.service("ProfileService", [ "$http", "API_URL", function($http, API_URL) {
	const fetchProfile = (profileId, callback) => {
		$http.get(API_URL + "/user/" + profileId).then(function(response) {
			callback(response.data);
		});
	};

	const fetchProfileStatus = function(query, callback) {
		$http({
			url: API_URL + "/user/status",
			method: "GET",
			params: {

			}
		}).then(function(response) {
			callback(response.data);
		});
	};

	const fetchRecommentedProfiles = function(profileId,params,callback) {
		$http({
			url: API_URL + "/user/" + profileId + "/recommented/accounts",
			method: "GET",
			params: params
		}).then(function(response) {
			callback(response.data);
		});
	};

	return {
		fetchProfileStatus: fetchProfileStatus,
		fetchProfile: fetchProfile,
		fetchRecommentedProfiles : fetchRecommentedProfiles
	};
}])

.controller("discoverController", [ "$stateParams", "ProfileService", function($stateParams, ProfileService) {
		ProfileService.fetchRecommentedProfiles($stateParams.profileId, {}, function(rProfiles){
		});
}])	

.controller("notifsController", [ "$rootScope", "$scope", "notifs", "$http", function($rootScope, $scope, notifs, $http) {
	$scope.notifs = notifs;
	$scope.page = 1;
	$scope.limit = 30;
	$rootScope.isLoading = true;
	$scope.postsAvailable = true;

	$scope.markAllNotifsAsRead = function() {
		$http.put("/api/notifications/read_all");
		if ($rootScope.userStatus) {
			$rootScope.userStatus.notifications_count = 0;
		}
		$scope.notifs = $scope.notifs.map(function(item) {
			item.status = 1;
			return item;
		});
	};

	$scope.markNotifAsRead = function(notif, index) {
		if (notif.status == 0) {
			$scope.notifs[index].status = 1;
			return $http.put("/api/notifications/read_one/" + notif.event_id);
		}
	};

	$scope.fetchNotifs = function(page, limit) {
		$http.get("/api/notifications?page=" + page + "&limit=" + limit).then(function(response) {
			response.data.forEach(function(feed) {
				$scope.notifs.push(feed);
			});

			if (response.data.length < $scope.limit) {
				$scope.postsAvailable = false;
			} else {
				$scope.postsAvailable = true;
			}
		});
	};

	$scope.loadMoreNotifs = function() {
		if (!$rootScope.activeCalls && $scope.postsAvailable) {
			$scope.page = $scope.page + 1;
			$scope.fetchNotifs($scope.page, $scope.limit);
		}
	};

	$scope.displayPost = function(notif) {
		if (notif.event_type == 2 && notif.post_type_id == 4) {
			return "pic";
		}
		if (notif.event_type == 2 && (notif.post_type_id == 3 || notif.post_type_id == 2)) {
			return 'post "' + notif.post_title + '"';
		}

		return "post";
	}
}])
.controller("profileController", ProfileCtrl)
.controller("editorController", EditorCtrl)
.controller("feedsController", FeedsCtrl)
.controller("welcomeController", WelcomeCtrl)
.controller("draftsController", DraftsCtrl)

.run([ "$rootScope", "$state", "ViciAuth", runs.onStateChange])

.directive('backImg', function() {
	return function(scope, element, attrs) {
		var url = attrs.backImg;
		element.css({
			'background-image': 'url(' + url + ')',
			'background-size': 'cover'
		});
	};
})
.directive('fallbackSrc', function() {
	var fallbackSrc = {
		link: function postLink(scope, iElement, iAttrs) {
			iElement.bind('error', function() {
				angular.element(this).attr("src", iAttrs.fallbackSrc);
			});
		}
	}
	return fallbackSrc;
})

.directive('feed', feedComponent)

.directive('postHeader', function() {
	return {
		templateUrl: '/templates/directives/postHeader.html'
	};
});
