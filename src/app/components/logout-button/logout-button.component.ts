import "./logout-button.styles.less";
import logoutButtonTemplateHtml from "./logout-button.template.html";

import { AuthService } from "../../../auth/AuthService";
import { IGlobalScope } from "../../../core/lib/interfaces";

import * as simpleWalletProvider from "../../../core/lib/simpleWalletProvider";

class LogoutButtonController {
  public static $inject = [
    "$rootScope",
    "$state",
    "AuthService",
  ];

  constructor(
    private $rootScope: IGlobalScope,
    private $state: ng.ui.IStateService,
    private authService: AuthService,
  ) {
    this.ngOnInit();
  }

  private ngOnInit() {}

  private onClick() {
    this.logout();
  }

  private logout = () => {
    this.authService.logout();

    this.$rootScope.user = undefined;
    this.$rootScope.simpleWallet = null;

    simpleWalletProvider.clean();

    window.location.href = "/login";
  }

}

export default function logoutButton(): ng.IDirective {
  return {
    controller: LogoutButtonController,
    controllerAs: "logoutButtonCtrl",
    restrict: "E",
    replace: true,
    template: logoutButtonTemplateHtml,
  };
}
