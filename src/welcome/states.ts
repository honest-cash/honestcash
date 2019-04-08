export default function state($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/signup");

  $stateProvider
  .state("login", {
    controller: "welcomeCtrl",
    controllerAs: "welcomeCtrl",
    url: "/login?code",
    templateUrl: "/templates/new-login.html",
  })
  .state("signup", {
    controller: "welcomeCtrl",
    controllerAs: "welcomeCtrl",
    url: "/signup",
    templateUrl: "/templates/welcome.html",
  })
  .state("thankyou", {
    controller: "welcomeCtrl",
    url: "/thank-you",
    templateUrl: "/templates/thankyou.html",
  });

  $stateProvider
  .state("starter", {
    templateUrl: "/templates/layout.html",
    controller: "welcomeCtrl",
  })
  .state("starter.about", {
    url: "/about",
    templateUrl: "/templates/about.html",
  });
}
