import "./login-page-tailwind-scss.styles.less";
import loginPageTailwindScssTemplateHtml from "./login-page-tailwind-scss.template.html";

class LoginPageTailwindSCSSController {
  public static $inject = [

  ];

  constructor(

  ) {

  }

}

export default function loginPageTailwindSCSS(): ng.IDirective {
  return {
    controller: LoginPageTailwindSCSSController,
    controllerAs: "loginPageTailwindSCSSCtrl",
    restrict: "E",
    scope: {
    },
    replace: true,
    template: loginPageTailwindScssTemplateHtml,
  };
}
