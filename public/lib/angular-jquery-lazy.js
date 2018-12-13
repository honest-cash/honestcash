// Based on jQuery plugin Lazy, http://jquery.eisbehr.de/lazy/

// TODO: passing options from controller to directive.
(function(window, angular, undefined) {
  angular.module('angular.lazyimg', [])
    .directive('lazyImg', function () {
      // Returning the Directive Definition Object
      return {
        restrict: "E",
        scope: false,
        link: function (scope, element, attrs) {
          var options = {
            bind: 'event',
            effect: "fadeIn",
            effectTime: 1500,
            //delay: 5000,
           
            beforeLoad: function (loadedElement) {
                   var imageTag = $('<img src="/img/loader-pacman-gif" />');
                    element.replaceWith(imageTag);
              // Lazy will call this function, before the image gets loaded
            },
            onLoad: function (loadedElement) {
              // while loading the image, especially on big images, this function will be called
            },
            afterLoad: function (loadedElement) {
              // this will be called after the image is finally loaded
              registerImage(loadedElement);
            },
            onError: function (loadedElement) {
              // is fired when http request != 200
              lazyError(loadedElement);
            }
          };
        
          if(scope.lazyOptions != undefined) {
            angular.extend(scope.lazyOptions, options);
          }
          // attribute conversion from the pseudo markup into real markup accepted by jquery plugin.
          var attributes = '';
        
          for(var prop in attrs) {
              if(prop.charAt(0) != '$') {
                if(prop == 'ngSrc') attributes += ' data-src="' + attrs[prop] + '" ';  // special case src attribute into data-src.
                else attributes += ' ' + prop + '="' + attrs[prop] + '" '; // one-to-one mapping for all other attributes.
              }
          }

          var imageTag = $('<img ' + attributes + ' />');
          element.replaceWith(imageTag);

          var registerImage = function (loadedElement) {
            // Firing the event upwards.
            scope.$emit('ImgLazyLoaded', loadedElement);
          };

          var lazyError = function(loadedElement) {
            // Firing the event upwards.
            scope.$emit('ImgNotLazyLoaded', [loadedElement, loadedElement.attr("data-src")]);
          };

          imageTag.lazy(options);
        }
      };
    });
})(window, window.angular);