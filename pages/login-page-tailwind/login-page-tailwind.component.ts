import loginPageTailwindTemplateHtml from "./login-page-tailwind.template.html";

class LoginPageTailwindController {
  public static $inject = [
  ];

  constructor(
  ) {
  }

}

export default function loginPageTailwind(): ng.IDirective {
  return {
    controller: LoginPageTailwindController,
    controllerAs: "loginPageTailwindCtrl",
    restrict: "E",
    scope: {
    },
    replace: true,
    template: loginPageTailwindTemplateHtml,
  };
}
