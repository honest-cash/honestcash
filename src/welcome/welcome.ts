import '../welcome/welcome.css';
import '../core/layout.css';

import angular from "angular";
import uiRouter from "angular-ui-router";
import routingConfig from '../core/config/routing';
import httpConfig from '../core/config/http';
import stateConfig from './states';
import WelcomeCtrl from './WelcomeCtrl';

import '../auth/AuthModule';
import '../core/config';
import '../core/services';

angular.module("welcome-app", [
	uiRouter,
	"vqAuth",
	"vqServices"
])

.config([ "$locationProvider", "$urlMatcherFactoryProvider", routingConfig ])
.config([ "$httpProvider", httpConfig ])
.config([ "$stateProvider", "$urlRouterProvider", stateConfig ])

.controller("welcomeCtrl", WelcomeCtrl);