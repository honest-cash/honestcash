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

    this.$scope.trustSrc = (src) => {
      return this.$sce.trustAsResourceUrl(src);
    };

    this.$scope.displayFeedBody = (html) => this.postService.displayHTML(html);
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
