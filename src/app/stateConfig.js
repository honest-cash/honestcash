export default function state ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('wallet', {
			abstract: true,
			templateUrl: "/templates/layout.html",
		})
		.state('wallet.create', {
			controller: "walletController",
			url: "/wallet",
			templateUrl: "/templates/wallet.html",
		});

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
		});

	$stateProvider.state('starter.signup', {
			url: "/signup",
			templateUrl: "/templates/welcome.html",
			controller: "welcomeController"
		})
		.state('vicigo', {
			abstract: true,
			controller: "mainController",
			templateUrl: "/templates/layout.html"
    })
    /**
     * START OF Feeds
     */
    .state('vicigo.feeds', {
            url: "/",
            templateUrl: "/templates/feeds.html",
            controller: "feedsController",
		})
		.state('vicigo.feedsNew', {
            url: "/new",
            templateUrl: "/templates/feeds.html",
            controller: "feedsController"
    })
    .state('vicigo.feedsTop', {
      url: "/top",
      templateUrl: "/templates/feeds.html",
      controller: "feedsController"
    })
    /**
     * END OF Feeds
     */
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
		.state('vicigo.profileEdit', {
			url: "/profile/:profileId/edit",
			templateUrl: "/templates/profile-edit.html",
			controller: "profileEditController",
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
