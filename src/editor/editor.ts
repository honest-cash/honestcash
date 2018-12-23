// import angular from 'angular';
import uiRouter from 'angular-ui-router';

import '../core/style.css';
import './editor.css';

import EditorCtrl from './EditorCtrl';
import routingConfig from '../core/config/routing';
import httpConfig from '../core/config/http';
import stateConfig from './states';

import '../AuthModule';
import '../core/config';

angular.module("editor-app", [
	uiRouter,
	  'ui.bootstrap',
    "vqAuth",
    "vqConfig"
])

.config([ "$locationProvider", "$urlMatcherFactoryProvider", routingConfig ])
.config([ "$httpProvider", httpConfig ])
.config([ "$stateProvider", "$urlRouterProvider", stateConfig ])

.controller("EditorCtrl", EditorCtrl)

.run([ "$rootScope", "AuthService", async ($rootScope, AuthService) => {
    let res;

    try {
        res = await AuthService.validate();
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
