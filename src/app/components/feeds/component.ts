import tippy from "tippy.js";
import 'tippy.js/dist/tippy.css';

import template from './template.html';
import PostService from '../../../core/services/PostService';

class FeedsDirectiveCtrl {
  constructor(
    private $rootScope,
    private $scope,
    private $sce,
    private postService: PostService
  ) {
    this.$scope.user = this.$rootScope.user;
    
    this.$scope.displayFeedBody = (html) => this.postService.displayHTML(html);
    this.initTippy();
  }

  private async initTippy() {
    tippy(".user-follower-count");
  }

  static $inject = [
    "$rootScope",
    "$scope",
    "$sce",
    "PostService"
  ]
}

export default function feeds(): ng.IDirective {
  return {
    restrict: 'E',
    scope: {
      "isLoading": "=isLoading",
      "feeds": "=feeds",
      "loadMore": "&loadMore",
      "upvote": "=onUpvote"
    },
    template,
    controller: FeedsDirectiveCtrl
  };
};
