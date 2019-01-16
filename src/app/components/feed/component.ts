import tippy from "tippy.js";
import 'tippy.js/dist/tippy.css';

import template from './template.html';
import templateStyle from './feed.css';

class FeedDirectiveCtrl {
  constructor(
    private $scope,
    private $sce,
    private styles,
  ) {
    this.styles = templateStyle;

    this.$scope.trustSrc = (src) => {
      return this.$sce.trustAsResourceUrl(src);
    };

    this.initTippy();
  }

  private async initTippy() {
    //data-tippy-content is not used in the HTML
    //because angular cannot interpolate the followerCount
    tippy(".user-follower-count", {
      content: `This author has ${this.$scope.feed.user.followerCount} followers`
    });
  }

  static $inject = [
    "$scope",
    "$sce"
  ]
}

export default function feed(): ng.IDirective {
  return {
    restrict: 'E',
    scope: {
        "feed": "=feed",
        "upvote": "=upvote",
    },
    template,
    controller: FeedDirectiveCtrl
  };
};
