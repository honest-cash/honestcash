export default function state ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/signup");

	$stateProvider
	.state('newWelcome', {
		url: "/login",
		controller: "welcomeCtrl",
		templateUrl: "/templates/new-login.html"
	});

	$stateProvider
		.state('starter', {
			templateUrl: "/templates/layout.html",
			controller: "welcomeCtrl",
		})
		.state('starter.welcome', {
			url: "/signup",
			templateUrl: "/templates/welcome.html"
		})
		.state('starter.thankyou', {
			url: "/thank-you",
			templateUrl: "/templates/thankyou.html"
		})
		.state('starter.login', {
			url: "/login?code",
			templateUrl: "/templates/login.html"
    });
};
