export default function state ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");

	$stateProvider
        .state("editor", {
            abstract: true,
            controller: "EditorCtrl",
            templateUrl: "/templates/layout_write.html",
        })
        .state("editor.write", {
            url: "/write",
            templateUrl: "/templates/write.html",
        })
        .state("editor.response", {
            url: "/write/response/:parentPostId",
            templateUrl: "/templates/write.html",
        })
        .state("editor.edit", {
            url: "/edit/:postId",
            templateUrl: "/templates/write.html",
        });
};
