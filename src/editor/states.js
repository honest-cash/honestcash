import writeHtml from "./write.html";
import layoutWriteHtml from "./layout_write.html"

export default function state ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");

	$stateProvider
        .state("editor", {
            abstract: true,
            controller: "EditorCtrl",
            template: layoutWriteHtml,
        })
        .state("editor.write", {
            url: "/write",
            template: writeHtml,
        })
        .state("editor.response", {
            url: "/write/response/:parentPostId",
            template: writeHtml,
        })
        .state("editor.edit", {
            url: "/edit/:postId",
            template: writeHtml,
        });
};
