import angular from "angular";
import angularUiRouter from "angular-ui-router";
import states from "./states";
import WelcomeCtrl from "./WelcomeCtrl";
import http from "../core/config/http";
import routing from "../core/config/routing";
import ProfileService from "../core/services/ProfileService";
import ScopeService from "../core/services/ScopeService";

import "../auth/AuthModule";
import "../core/config";

import "../welcome/welcome.css";

import "../core/layout.css";

angular.module("vqServices", ["vqConfig"])
  .service("ProfileService", ProfileService)
  .service("ScopeService", ScopeService);

angular.module("welcome-app", [
  angularUiRouter,
  "vqAuth",
  "vqServices",
])

.config(["$locationProvider", "$urlMatcherFactoryProvider", routing])
.config(["$httpProvider", http])
.config(["$stateProvider", "$urlRouterProvider", states])

.controller("welcomeCtrl", WelcomeCtrl);
