import angular from "angular";
import uiRouter from "angular-ui-router";
import stateConfig from "./states";
import WelcomeCtrl from "./WelcomeCtrl";
import httpConfig from "../core/config/http";
import routingConfig from "../core/config/routing";
import ProfileService from "../core/services/ProfileService";
import ScopeService from "../core/services/ScopeService";

import "../auth/AuthModule";
import "../core/config";

import "../welcome/welcome.css";

import "../core/layout.css";

angular.module("vqServices", [ "vqConfig" ])
  .service("ProfileService", [ "$http", "API_URL", ProfileService ])
  .service("ScopeService", ScopeService);

angular.module("welcome-app", [
	uiRouter,
	"vqAuth",
	"vqServices"
])

.config([ "$locationProvider", "$urlMatcherFactoryProvider", routingConfig ])
.config([ "$httpProvider", httpConfig ])
.config([ "$stateProvider", "$urlRouterProvider", stateConfig ])

.controller("welcomeCtrl", WelcomeCtrl);
