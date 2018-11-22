export default function state ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('starter', {
			templateUrl: "/templates/layout.html",
			controller: "mainController"
		})
		.state('starter.welcome', {
			url: "/",
			templateUrl: "/templates/welcome.html",
			controller: "welcomeController",
		})
		.state('starter.thankyou', {
			url: "/thank-you",
			templateUrl: "/templates/thankyou.html",
			controller: "welcomeController",
		})
		.state('starter.login', {
			url: "/login?code",
			templateUrl: "/templates/login.html",
			controller: "welcomeController"
		})
		.state('starter.signup', {
			url: "/signup",
			templateUrl: "/templates/welcome.html",
			controller: "welcomeController"
		})
		.state('vicigo', {
			abstract: true,
			controller: "mainController",
			templateUrl: "/templates/layout.html"
		})
        .state('vicigo.feeds', {
            url: "/feeds",
            templateUrl: "/templates/feeds.html",
            controller: "feedsController",
            resolve: {
                seo: function(MetaService) {
                    return MetaService.setDefault();
                },
                checkLoggedIn: function() {
                    return true;
                },

            }
        })
	    .state('vicigo.importPhotos', {
			url: "/import",
			templateUrl: "/templates/import.html",
			controller: "importController",
		})
		.state('vicigo.chat', {
			url: "/chat/:userId",
			templateUrl: "/templates/chat.html",
			controller: "chatController",
		})
		.state('vicigo.notifs', {
			url: "/notifs",
			templateUrl: "/templates/notifs.html",
			controller: "notifsController",
			resolve: {
				'notifs': function($stateParams, $http, MetaService) {
					return $http.get("/api/notifications?page=1&limit=30").then(function(response) {
						return response.data;
					});
				}
			}
		})
		.state('vicigo.hashtag', {
			url: "/hashtag/:hashtag",
			templateUrl: "/templates/feeds.html",
			controller: "feedsController",
			resolve: {
				'seo': function($stateParams, MetaService) {
					return MetaService.setForHashtag($stateParams.hashtag);
				},

			}
		})
		.state('vicigo.drafts', {
			url: "/drafts/",
			templateUrl: "/templates/drafts.html",
			controller: "draftsController"
		})
		.state('editor', {
			abstract: true,
			templateUrl: "/templates/layout_write.html",
		})
		.state('editor.write', {
			url: "/write",
			templateUrl: "/templates/write.html",
		})
		.state('editor.edit', {
			url: "/edit/:postId",
			templateUrl: "/templates/write.html",
		})
		.state('vicigo.profile', {
			url: "/profile/:profileId",
			templateUrl: "/templates/profile.html",
			controller: "profileController",
			resolve: {
				'profile': ($stateParams, $q, ProfileService) => {
					var defer = $q.defer();

					ProfileService.fetchProfile($stateParams.profileId, (rProfile) => {
						defer.resolve(rProfile);
					});

					return defer.promise;
				}
			}
		})
		.state('vicigo.post', {
			url: "/:username/:alias",
			templateUrl: "/templates/post.html",
			controller: "postController",
			resolve: {
				'post': ($stateParams, $q, PostService) => {
					var defer = $q.defer();

					PostService.getById($stateParams.alias, (rPost) => {
						defer.resolve(rPost);
					});

					return defer.promise;
				}
			}
		})
		.state('vicigo.hashbookNew', {
			url: "/u/hashbook/create",
			templateUrl: "/templates/blog_create.html",
			controller: "blogNewController"
		})
		.state('hashbook', {
			abstract: true,
			templateUrl: "/templates/layout_blog.html",
			controller: "mainController",
		})

		.state('hashbook.list', {
			url: "/hashbook/:blogSlug",
			templateUrl: "/templates/blog.html",
			controller: "blogController"
		})
		.state('hashbook.edit', {
			url: "/u/hashbook/:blogSlug/edit",
			templateUrl: "/templates/blog_edit_simple.html",
			controller: "blogEditController"
		})

		.state('vicigo.hashbooks', {
			url: "/profile/:profileIdentifier/hashbooks",
			templateUrl: "/templates/blogs.html",
			controller: "profileBlogsController"
		})
		.state('vicigo.postByAlias', {
			url: "/post/:username/:alias",
			templateUrl: "/templates/post.html",
			controller: "postController",
			resolve: {
				'post': function($stateParams, $rootScope, $http, MetaService, PostService) {
					return $http.get("/post/" + $stateParams.username + "/" + $stateParams.alias).then(function(response) {
						MetaService.setForPost(response.data);
						return response.data;
					});

				}
			}
		})
};
