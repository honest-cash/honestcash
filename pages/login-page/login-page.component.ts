import "./login-page.styles.less";
import loginPageTemplateHtml from "./login-page.template.html";

class LoginPageController {
  public static $inject = [
  ];

  constructor(
  ) {
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
