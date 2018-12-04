import '../core/style.css';
import './styles/profile.css';
import './styles/post.css';

// import angular from 'angular';
import 'jquery';
import uiRouter from 'angular-ui-router';
import infiniteScroll from  'ng-infinite-scroll';
import ProfileCtrl from './controllers/ProfileCtrl';
import FeedsCtrl from './controllers/FeedsCtrl';
import WelcomeCtrl from './controllers/WelcomeCtrl';
import DraftsCtrl from './controllers/DraftsCtrl';
import routingConfig from '../core/config/routing';
import httpConfig from '../core/config/http';
import stateConfig from './stateConfig';

import PostCtrl from './controllers/PostCtrl';
import WalletCtrl from './controllers/WalletCtrl';
import MainCtrl from './controllers/MainCtrl';
import * as runs from './runs/runs';

import '../AuthModule';
import '../core/config';
import '../core/services';
import './components';

var imageDropzone, profilePicDropzone, hashbookBGDropzone;

angular.module("hashtag-app", [
	uiRouter,
	'ui.bootstrap',
	infiniteScroll,
	"dcbImgFallback", 
	"xeditable",
	'ngDialog',
	"angular.lazyimg",
	"vqAuth",
	"vqServices",
	"vqDirectives"
])

.config([ "$locationProvider", "$urlMatcherFactoryProvider", routingConfig ])
.config([ "$httpProvider", httpConfig])
.config([ "$stateProvider", "$urlRouterProvider", stateConfig ])

.controller("appController", [ "$scope", "AuthService", function($scope, AuthService) {
	$scope.AUTH_TOKEN = AuthService.getAuthToken();
}])

.controller("walletController", WalletCtrl)
.controller("mainController", MainCtrl)
.controller("postController", PostCtrl)
.controller("profileController", ProfileCtrl)
.controller("feedsController", FeedsCtrl)
.controller("welcomeController", WelcomeCtrl)
.controller("draftsController", DraftsCtrl)

.run([ "$rootScope", runs.initBCHWallet ])

.run([ "$rootScope", "$state", "AuthService", runs.onStateChange])

.run([ "API_URL", "AuthService", runs.initProfileUpload ])

.run([ "editableOptions", function(editableOptions) {
	editableOptions.theme = 'bs3';
}]);