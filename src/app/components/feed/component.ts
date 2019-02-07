import tippy from "tippy.js";
import 'tippy.js/dist/tippy.css';

import template from './template.html';
import templateStyle from './feed.less';

import PostService from "../../../core/services/PostService";

class FeedDirectiveCtrl {
  constructor(
    private $scope,
    private $sce,
    private postService: PostService,
  ) {
    this.$scope.styles = templateStyle;

    this.$scope.trustSrc = (src) => {
      return this.$sce.trustAsResourceUrl(src);
    };

    this.$scope.displayFeedBody = (html: string) => this.postService.displayHTML(html);

    this.initTippy();
  }

  private async initTippy() {
    /**
     * data-tippy-content is not used in the HTML because angular cannot interpolate the followerCount
    */
    tippy(".user-follower-count", {
      content: `${this.$scope.feed.user.followerCount} followers, ${this.$scope.feed.user.followingCount} following`
    });
  }

  static $inject = [
    "$scope",
    "$sce",
    "PostService",
  ]
}

export default function feed(): ng.IDirective {
  return {
    restrict: 'E',
    scope: {
        "feed": "=",
        "user": "=",
    },
    template,
    controller: FeedDirectiveCtrl
  };
};
