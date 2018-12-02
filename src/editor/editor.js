// import angular from 'angular';
import 'jquery';
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

.run([ "$rootScope", "AuthService", function($rootScope, AuthService) {
    AuthService.validate((data) => {
        if (data) {
            $rootScope.user = {
                id: data.id,
                imageUrl: data.imageUrl,
                name: data.username
            };

            return;
        }

        location.href = "/login";
    });
}]);

