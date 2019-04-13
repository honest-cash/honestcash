import angularUiRouter from "angular-ui-router";

import "../core/style.css";
import "./editor.css";

import EditorCtrl from "./EditorCtrl";
import routing from "../core/config/routing";
import http from "../core/config/http";
import states from "./states";

import "../auth/AuthModule";
import { AuthService } from "../auth/AuthService";
import PostService from "../core/services/PostService";
import WalletService from "../core/services/WalletService";
import ScopeService from "../core/services/ScopeService";
import "../core/config";
import "./services";

declare var angular: any;
interface IGlobalScope {
  user: {
    imageUrl: string;
    id: number;
    username: string;
  };
}

angular.module("editor-app", [
  angularUiRouter,
  "ui.bootstrap",
  "vqAuth",
  "vqConfig",
  "vqServices",
])

.config(["$locationProvider", "$urlMatcherFactoryProvider", routing])
.config(["$httpProvider", http])
.config(["$stateProvider", "$urlRouterProvider", states])
.service("PostService", PostService)
.service("WalletService", WalletService)
.service("ScopeService", ScopeService)
.controller("EditorCtrl", EditorCtrl)

.run(["$rootScope", "AuthService", async ($rootScope: IGlobalScope, authService: AuthService) => {
  let res;

  try {
    res = await authService.validate();
  } catch (err) {
    return location.href = "/login";
  }

  const data = res.data;

  $rootScope.user = {
    id: data.id,
    imageUrl: data.imageUrl,
    username: data.username,
  };
}]);
