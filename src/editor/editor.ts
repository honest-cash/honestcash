// import angular from 'angular';
import uiRouter from 'angular-ui-router';

import '../core/style.css';
import './editor.css';

import EditorCtrl from './EditorCtrl';
import routingConfig from '../core/config/routing';
import httpConfig from '../core/config/http';
import stateConfig from './states';

import '../auth/AuthModule';
import { AuthService } from '../auth/AuthService';
import PostService from '../core/services/PostService';
import '../core/config';

declare var angular: any;
interface IGlobalScope {
  user: {
    imageUrl: string;
    id: number;
    username: string;
  }
}

angular.module("editor-app", [
	uiRouter,
	  'ui.bootstrap',
    "vqAuth",
    "vqConfig"
])

.config([ "$locationProvider", "$urlMatcherFactoryProvider", routingConfig ])
.config([ "$httpProvider", httpConfig ])
.config([ "$stateProvider", "$urlRouterProvider", stateConfig ])
.service("PostService", PostService)
.controller("EditorCtrl", EditorCtrl)

.run([ "$rootScope", "AuthService", async ($rootScope: IGlobalScope, AuthService: AuthService) => {
    let res;

    try {
        res = await AuthService.validate(() => {});
    } catch (err) {
        return location.href = "/login";
    }

    const data = res.data;

    $rootScope.user = {
      id: data.id,
      imageUrl: data.imageUrl,
      username: data.username
    };
}]);
