import "../core/style.css";
import "./styles/profile.css";
import "./styles/post.css";
import "./styles/feed.css";

import angularUiRouter from "angular-ui-router";
import ngInfiniteScroll from  "ng-infinite-scroll";

import ProfileCtrl from "./profile/ProfileCtrl";
import ProfileEditCtrl from "./profile-edit/ProfileEditCtrl";
import FeedsCtrl from "./feeds/FeedsCtrl";
import PostsCtrl from "./posts/PostsCtrl";
import NotifsCtrl from "./notifs/NotifsCtrl";
import SettingsCtrl from "./settings/SettingsCtrl";

import routing from "../core/config/routing";
import http from "../core/config/http";
import stateConfig from "./stateConfig";

import PostCtrl from "./post/PostCtrl";
import WalletCtrl from "./wallet/WalletCtrl";
import MainCtrl from "../core/controllers/MainCtrl";
import * as runs from "../core/runs/runs";
import { AuthService } from "../auth/AuthService";

import "../auth/AuthModule";
import "../core/config";
import "../core/services";
import "./components";

import "../core/config/toastr";

declare var angular: any;

angular.module("hashtag-app", [
  angularUiRouter,
  "ui.bootstrap",
  ngInfiniteScroll,
  "dcbImgFallback",
  "ngDialog",
  "angular.lazyimg",
  "vqAuth",
  "vqServices",
  "vqDirectives",
])

.config(["$locationProvider", "$urlMatcherFactoryProvider", routing])
.config(["$httpProvider", http])
.config(["$stateProvider", "$urlRouterProvider", stateConfig])

.controller("appController", [
  "$scope",
  "AuthService",
  ($scope, authService: AuthService) => {
    $scope.AUTH_TOKEN = authService.getAuthToken();
  },
])

.controller("walletController", WalletCtrl)
.controller("mainController", MainCtrl)
.controller("postController", PostCtrl)
.controller("profileController", ProfileCtrl)
.controller("profileEditController", ProfileEditCtrl)
.controller("feedsController", FeedsCtrl)
.controller("postsCtrl", PostsCtrl)
.controller("settingsCtrl", SettingsCtrl)
.controller("notifsCtrl", NotifsCtrl)

.run(["$rootScope", runs.initBCHWallet])

.run(["$rootScope", "$state", "AuthService", runs.onStateChange])

.run(["API_URL", "AuthService", runs.initProfileUpload]);
