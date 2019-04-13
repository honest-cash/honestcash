import { AuthService } from "./AuthService";
import * as simpleWalletProvider from "../core/lib/simpleWalletProvider";
import { IGlobalScope } from "../core/lib/interfaces";

declare var angular: any;

angular.module("vqAuth", [])

.constant("API_URL", "localhost:3010")

.factory("AuthInterceptor", [
  "$rootScope", "$q", function ($rootScope: IGlobalScope, $q: ng.IQService): ng.IHttpInterceptor {
    if ($rootScope.activeCalls === undefined) {
      $rootScope.activeCalls = 0;
    }

    return {
      request: (config) => {
        $rootScope.activeCalls += 1;

        return config;
      },
      requestError: (rejection) => {
        $rootScope.activeCalls -= 1;

        return $q.reject(rejection);
      },
      response: (response) => {
        $rootScope.activeCalls -= 1;

        return response;
      },
      responseError: (response) => {
        $rootScope.activeCalls -= 1;

        if (response.status === 401) {
          $rootScope.$broadcast("notAuthenticated");
        }

        return $q.reject(response);
      },
    };
  }])

.constant("API", {
  LOGIN: "/login",
  SIGNUP: "/signup/email",
  VALIDATE: "/me",
  LOGOUT: "/logout",
  RESET: "/auth/request-password-reset",
  CHANGE_PASSWORD: "/auth/reset-password",
  SET_PASSWORD: "/auth/change-password",
  SET_WALLET: "/auth/set-wallet",
  PASSWORD_CHECK: "/auth/password-check",
  GET_EMAILS: "/auth/emails",
})

.factory("apiFactory", ["API_URL", "API", function (API_URL, API) {
  return (method) => {
    return API_URL + API[method];
  };
}])

.service("AuthService", AuthService)
.run(["AuthService", "$rootScope", function (
  authService: AuthService,
  $rootScope: ng.IRootScopeService,
) {
  authService.loadUserCredentials();

  $rootScope.$on("notAuthenticated", () => {
    authService.destroyUserCredentials();
    simpleWalletProvider.clean();
  });
}]);
