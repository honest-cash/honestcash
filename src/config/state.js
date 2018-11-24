export default function state ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('starter', {
			templateUrl: "/templates/layout.html",
			controller: "mainController"
		})
		.state('starter.welcome', {
			url: "/signup",
			templateUrl: "/templates/welcome.html",
			controller: "welcomeController",
		})
		.state('starter.thankyou', {
			url: "/thank-you",
			templateUrl: "/templates/thankyou.html",
			controller: "welcomeController",
		})
		.state('starter.login', {
			url: "/login?code",
			templateUrl: "/templates/login.html",
			controller: "welcomeController"
		})
		.state('starter.signup', {
			url: "/signup",
			templateUrl: "/templates/welcome.html",
			controller: "welcomeController"
		})

		.state('vicigo', {
			abstract: true,
			controller: "mainController",
			templateUrl: "/templates/layout.html"
		})
        .state('vicigo.feeds', {
            url: "/",
            templateUrl: "/templates/feeds.html",
            controller: "feedsController",
            resolve: {
                checkLoggedIn: function() {
                    return true;
                },
            }
        })
		.state('vicigo.chat', {
			url: "/chat/:userId",
			templateUrl: "/templates/chat.html",
			controller: "chatController",
		})
		.state('vicigo.notifs', {
			url: "/notifs",
			templateUrl: "/templates/notifs.html",
			controller: "notifsController",
			resolve: {
				'notifs': [ "$stateParams", "$http", function($stateParams, $http) {
					return $http.get("/api/notifications?page=1&limit=30").then(function(response) {
						return response.data;
					});
				}]
			}
		})
		.state('vicigo.hashtag', {
			url: "/hashtag/:hashtag",
			templateUrl: "/templates/feeds.html",
			controller: "feedsController",
		})
		.state('vicigo.drafts', {
			url: "/drafts/",
			templateUrl: "/templates/drafts.html",
			controller: "draftsController"
		})
		.state('editor', {
			abstract: true,
			templateUrl: "/templates/layout_write.html",
		})
		.state('editor.write', {
			url: "/write",
			templateUrl: "/templates/write.html",
		})
		.state('editor.response', {
			url: "/write/response/:parentPostId",
			templateUrl: "/templates/write.html",
		})
		.state('editor.edit', {
			url: "/edit/:postId",
			templateUrl: "/templates/write.html",
		})
		.state('vicigo.profile', {
			url: "/profile/:profileId",
			templateUrl: "/templates/profile.html",
			controller: "profileController",
			resolve: {
				'profile': [ "$stateParams", "$q", "ProfileService", ($stateParams, $q, ProfileService) => {
					var defer = $q.defer();

					ProfileService.fetchProfile($stateParams.profileId, (rProfile) => {
						defer.resolve(rProfile);
					});

					return defer.promise;
				}]
			}
		})
		.state('vicigo.post', {
			url: "/:username/:alias",
			templateUrl: "/templates/post.html",
			controller: "postController",
			resolve: {
				'post': [ "$stateParams", "$q", "PostService",($stateParams, $q, PostService) => {
					var defer = $q.defer();

					PostService.getById($stateParams.alias, (rPost) => {
						defer.resolve(rPost);
					});

					return defer.promise;
				}]
			}
		})
		.state('vicigo.postById', {
			url: "/post/:postId",
			templateUrl: "/templates/post.html",
			controller: "postController",
			resolve: {
				'post': ["$stateParams", "$q", "PostService", ($stateParams, $q, PostService) => {
					var defer = $q.defer();

					PostService.getById($stateParams.postId, (rPost) => {
						defer.resolve(rPost);
					});

					return defer.promise;
				}]
			}
		})
		/**
		 * dagur posted a buggy link on reddit and we need to support it.
		 */
		.state('vicigo.postByIdBroken', {
			url: "/:postId",
			templateUrl: "/templates/post.html",
			controller: "postController",
			resolve: {
				'post': ["$stateParams", "$q", "PostService", ($stateParams, $q, PostService) => {
					var defer = $q.defer();

					PostService.getById($stateParams.postId, (rPost) => {
						defer.resolve(rPost);
					});

					return defer.promise;
				}]
			}
		})
		.state('vicigo.postByAlias', {
			url: "/post/:username/:alias",
			templateUrl: "/templates/post.html",
			controller: "postController",
			resolve: {
				'post': [ "$stateParams", "$http", function($stateParams, $http) {
					return $http.get("/post/" + $stateParams.username + "/" + $stateParams.alias)
					.then(function(response) {
						return response.data;
					});
				}]
			}
		})
};
