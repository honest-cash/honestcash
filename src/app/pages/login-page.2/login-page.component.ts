import "./login-page.styles.less";
import loginPageTemplateHtml from "./login-page.template.html";

import { IGlobalScope } from "../../../core/lib/interfaces";

interface IScopeLoginPageCtrl extends ng.IScope {
}

class LoginPageController {
  public static $inject = [
    "$rootScope",
    "$scope",
  ];

  constructor(
    private $rootScope: IGlobalScope,
    private $scope: IScopeLoginPageCtrl,
  ) {
    this.ngOnInit();
  }

  private ngOnInit() {
  }

}

export default function loginPage(): ng.IDirective {
  return {
    controller: LoginPageController,
    controllerAs: "loginPageCtrl",
    restrict: "E",
    scope: {
    },
    replace: true,
    template: loginPageTemplateHtml,
  };
}
