import angular from "angular";
import angularUiRouter from "angular-ui-router";
import welcomeRoutes from "./welcome.routes";
import welcomeComponent from "./welcome.component";
import http from "../core/config/http";
import routing from "../core/config/routing";
import ProfileService from "../core/services/ProfileService";
import ScopeService from "../core/services/ScopeService";

import "../auth/AuthModule";
import "../core/config";

import "../welcome/welcome.less";

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
.config(["$stateProvider", "$urlRouterProvider", welcomeRoutes])

.controller("welcomeCtrl", welcomeComponent);
