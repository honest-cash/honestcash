import appComponentHtml from "../app.component.html";
import feedsHtml from "./feeds/feeds.html";
import walletHtml from "./wallet/wallet.html";
import notifsHtml from "./notifs/notifs.html";
import settingsHtml from "./settings/settings.html";
import postsHtml from "./posts/posts.html";
import profileHtml from "./profile/profile.html";
import postHtml from "./post/post.html";
import profileEditHtml from "./profile-edit/profile-edit.html";
import { IGlobalScope } from "../core/lib/interfaces";

const redirectIfNotLoggedIn = [
  "$rootScope",
  ($rootScope: IGlobalScope) => {
    if (!$rootScope.user || ($rootScope.user && !$rootScope.user.id)) {
      location.href = "/login";
    }
  },
];

const getFeedState = url => {
  return {
    url,
    template: feedsHtml,
    controller: "feedsController",
  };
};

export default function state($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("wallet", {
      abstract: true,
      controller: "mainController",
      template: appComponentHtml,
    })
    .state("wallet.create", {
      controller: "walletController",
      url: "/wallet",
      template: walletHtml,
      resolve: {
        isLoggedIn: redirectIfNotLoggedIn,
      },
    });

  $stateProvider
    .state("vicigo", {
      abstract: true,
      controller: "mainController",
      template: appComponentHtml,
    })
    /**
     * START OF Feeds
     */
    .state("vicigo.feeds", getFeedState("/"))
    .state("vicigo.feedsNew", getFeedState("/{feedType:new|top}"))
    .state(
      "vicigo.feedsNewScoped",
      getFeedState("/{feedType:new|top}?feedScope={last-month|all-time}"),
    )
    .state("vicigo.hashtag", getFeedState("/hashtag/:hashtag?feedScope={all-time}"))
    .state(
      "vicigo.hashtagFeed",
      getFeedState("/hashtag/:hashtag/{feedType:new|top}?feedScope={all-time}"),
    )

    /**
     * END OF Feeds
     */
    .state("vicigo.notifs", {
      url: "/notifs",
      template: notifsHtml,
      controller: "notifsCtrl",
      controllerAs: "notifsCtrl",
      resolve: {
        isLoggedIn: redirectIfNotLoggedIn,
      },
    })
    .state("vicigo.settings", {
      url: "/settings",
      template: settingsHtml,
      controller: "settingsCtrl",
      resolve: {
        isLoggedIn: redirectIfNotLoggedIn,
      },
    })
    .state("vicigo.posts", {
      url: "/posts",
      template: postsHtml,
      controller: "postsCtrl",
      resolve: {
        isLoggedIn: redirectIfNotLoggedIn,
      },
    })
    .state("vicigo.profile", {
      url: "/profile/:profileId",
      template: profileHtml,
      controller: "profileController",
      controllerAs: "profileCtrl",
      resolve: {
        profile: [
          "$stateParams",
          "$q",
          "ProfileService",
          ($stateParams, $q, ProfileService) => {
            const defer = $q.defer();

            ProfileService.fetchProfile($stateParams.profileId, rProfile => {
              defer.resolve(rProfile);
            });

            return defer.promise;
          },
        ],
      },
    })
    .state("vicigo.profileEdit", {
      url: "/profile/:profileId/edit",
      template: profileEditHtml,
      controller: "profileEditController",
      requireLogin: true,
      resolve: {
        profile: [
          "$stateParams",
          "$q",
          "ProfileService",
          ($stateParams, $q, ProfileService) => {
            const defer = $q.defer();

            ProfileService.fetchProfile($stateParams.profileId, rProfile => {
              defer.resolve(rProfile);
            });

            return defer.promise;
          },
        ],
        isLoggedIn: redirectIfNotLoggedIn,
      },
    })
    .state("vicigo.post", {
      url: "/:username/:alias",
      template: postHtml,
      controller: "postController",
      controllerAs: "postCtrl",
    })
    .state("vicigo.postById", {
      url: "/post/:postId",
      template: postHtml,
      controller: "postController",
      controllerAs: "postCtrl",
    })
    .state("vicigo.postByAlias", {
      url: "/post/:username/:alias",
      template: postHtml,
      controller: "postController",
      controllerAs: "postCtrl",
    });
}
