import "../core/style.css";
import "../core/layout.css";
import "./styles/profile.css";
import "./styles/post.css";
import "./styles/feed.css";

// import angular from 'angular';
import angularUiRouter from "angular-ui-router";
import ngInfiniteScroll from  "ng-infinite-scroll";
import ProfileCtrl from "./controllers/ProfileCtrl";
import ProfileEditCtrl from "./controllers/ProfileEditCtrl";
import FeedsCtrl from "./controllers/FeedsCtrl";
import PostsCtrl from "./controllers/PostsCtrl";
import DraftsCtrl from "./controllers/DraftsCtrl";
import NotifsCtrl from "./controllers/NotifsCtrl";
import routing from "../core/config/routing";
import http from "../core/config/http";
import stateConfig from "./stateConfig";

import PostCtrl from "./controllers/PostCtrl";
import WalletCtrl from "./controllers/WalletCtrl";
import MainCtrl from "../core/controllers/MainCtrl";
import * as runs from "../core/runs/runs";
import { AuthService } from "../auth/AuthService";

import "../auth/AuthModule";
import "../core/config";
import "../core/services";
import "./components";

import "../core/config/toastr";
import SettingsCtrl from "./controllers/SettingsCtrl";

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
  function ($scope, AuthService: AuthService) {
	  $scope.AUTH_TOKEN = AuthService.getAuthToken();
  },
])

.controller("walletController", WalletCtrl)
.controller("mainController", MainCtrl)
.controller("postController", PostCtrl)
.controller("profileController", ProfileCtrl)
.controller("profileEditController", ProfileEditCtrl)
.controller("feedsController", FeedsCtrl)
.controller("draftsController", DraftsCtrl)
.controller("postsCtrl", PostsCtrl)
.controller("settingsCtrl", SettingsCtrl)
.controller("notifsCtrl", NotifsCtrl)

.run(["$rootScope", runs.initBCHWallet])

.run(["$rootScope", "$state", "AuthService", runs.onStateChange])

.run(["API_URL", "AuthService", runs.initProfileUpload]);
