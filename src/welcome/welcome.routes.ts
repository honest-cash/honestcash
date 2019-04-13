import welcomeHtml from "./landing/welcome.html";
import thankyouHtml from "./thankyou/thankyou.html";
import loginHtml from "./login/login.html";
import aboutHtml from "./about/about.html";
import appComponentHtml from "../app.component.html";

export default function state($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/signup");

  $stateProvider
  .state("login", {
    controller: "welcomeCtrl",
    controllerAs: "welcomeCtrl",
    url: "/login?code",
    template: loginHtml,
  })
  .state("signup", {
    controller: "welcomeCtrl",
    controllerAs: "welcomeCtrl",
    url: "/signup",
    template: welcomeHtml,
  })
  .state("thankyou", {
    controller: "welcomeCtrl",
    url: "/thank-you",
    template: thankyouHtml,
  });

  $stateProvider
  .state("starter", {
    template: appComponentHtml,
    controller: "welcomeCtrl",
  })
  .state("starter.about", {
    url: "/about",
    template: aboutHtml,
  });
}
