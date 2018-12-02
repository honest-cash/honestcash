import feedComponent from './feed/component';

angular.module("vqDirectives", [ "vqConfig" ])
	.directive('backImg', function() {
		return function(scope, element, attrs) {
			var url = attrs.backImg;
			element.css({
				'background-image': 'url(' + url + ')',
				'background-size': 'cover'
			});
		};
    })

	.directive('fallbackSrc', function() {
		var fallbackSrc = {
			link: function postLink(scope, iElement, iAttrs) {
				iElement.bind('error', function() {
					angular.element(this).attr("src", iAttrs.fallbackSrc);
				});
			}
		}
		return fallbackSrc;
    })

	.directive('feed', feedComponent)

	.directive('postHeader', function() {
		return {
			templateUrl: '/templates/directives/postHeader.html'
		};
    });
    