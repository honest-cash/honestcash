import upvoteButton from './upvote-button/component';
import feed from './feed/component';
import feeds from './feeds/component';

angular
  .module('vqDirectives', ['vqConfig'])
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
          angular.element(this).attr('src', iAttrs.fallbackSrc);
        });
      }
    };
    return fallbackSrc;
  })

  .directive('parseStyle', ['$compile', function($compile) {
    return {
      restrict: 'E',
      link: function postLink(scope, element) {
        if (element.html()) {
          var template = $compile('<style ng-bind-template="' + element.html() + '"></style>');
          element.replaceWith(template(scope));
        }
      }
    };
  }])
  .directive('feed', feed)
  .directive('feeds', feeds)
  .directive('upvoteButton', upvoteButton);