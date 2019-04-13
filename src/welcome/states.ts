import welcomeHtml from "./welcome.html";
import thankyouHtml from "./thankyou.html";
import loginHtml from "./login.html";
import aboutHtml from "./about.html";

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
    templateUrl: "/templates/layout.html",
    controller: "welcomeCtrl",
  })
  .state("starter.about", {
    url: "/about",
    template: aboutHtml,
  });
}
