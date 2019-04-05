export default function state($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/signup");

  $stateProvider
  .state("welcome", {
    controller: "welcomeCtrl",
    controllerAs: "welcomeCtrl",
    url: "/",
    templateUrl: "/templates/welcome.html",
  })
  .state("login", {
    controller: "welcomeCtrl",
    controllerAs: "welcomeCtrl",
    url: "/login?code",
    templateUrl: "/templates/welcome.html",
  })
  .state("signup", {
    controller: "welcomeCtrl",
    controllerAs: "welcomeCtrl",
    url: "/signup",
    templateUrl: "/templates/welcome.html",
  })
  .state("thankyou", {
    controller: "welcomeCtrl",
    controllerAs: "welcomeCtrl",
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
