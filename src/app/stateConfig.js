const getFeedState = (url) => {
  return {
    url,
    templateUrl: "/templates/feeds.html",
    controller: "feedsController"
  };
};

export default function state ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('wallet', {
			abstract: true,
			controller: "mainController",
			templateUrl: "/templates/layout.html",
		})
		.state('wallet.create', {
			controller: "walletController",
			url: "/wallet",
			templateUrl: "/templates/wallet.html",
		});

	$stateProvider
		.state('vicigo', {
			abstract: true,
			controller: "mainController",
			templateUrl: "/templates/layout.html"
    })
    /**
     * START OF Feeds
     */
    .state('vicigo.feeds', getFeedState("/"))
		.state('vicigo.feedsNew', getFeedState("/{feedType:new|top}"))
    .state('vicigo.hashtag', getFeedState("/hashtag/:hashtag"))
    .state('vicigo.hashtagFeed', getFeedState("/hashtag/:hashtag/{feedType:new|top}"))
   
    /**
     * END OF Feeds
     */
		.state('vicigo.notifs', {
			url: "/notifs",
			templateUrl: "/templates/notifs.html",
      controller: "notifsCtrl",
      controllerAs: "notifsCtrl"
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
      controllerAs: "profileCtrl",
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
      controllerAs: "postCtrl",
		})
		.state('vicigo.postById', {
			url: "/post/:postId",
			templateUrl: "/templates/post.html",
      controller: "postController",
      controllerAs: "postCtrl"
		})
		.state('vicigo.postByAlias', {
			url: "/post/:username/:alias",
			templateUrl: "/templates/post.html",
      controller: "postController",
      controllerAs: "postCtrl"
		})
};
