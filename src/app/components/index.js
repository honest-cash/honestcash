import feed from './feed/component';
import feeds from './feeds/component';
import followUnfollowButton from './follow-unfollow-button/follow-unfollow-button.component';
import logoutButton from './logout-button/logout-button.component';
import socialShareButtons from './social-share-buttons/social-share-buttons.component';
import upvoteButton from './upvote-button/upvote-button.component';
import uncensorableButton from './uncensorable-button/uncensorable-button.component';
import bottomCallToActionBar from './bottom-call-to-action-bar/bottom-call-to-action-bar.component';
import simpleLedgerProtocolDetails from './simple-ledger-protocol-details/simple-ledger-protocol-details.component';

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
  .directive('feed', feed)
  .directive('feeds', feeds)
  .directive('upvoteButton', upvoteButton)
  .directive('uncensorableButton', uncensorableButton)
  .directive('logoutButton', logoutButton)
  .directive('followUnfollowButton', followUnfollowButton)
  .directive('bottomCallToActionBar', bottomCallToActionBar)
  .directive('simpleLedgerProtocolDetails', simpleLedgerProtocolDetails)
  .directive('socialShareButtons', socialShareButtons);