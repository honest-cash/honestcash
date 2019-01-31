import template from './template.html';

class FeedsDirectiveCtrl {
  constructor(
    private $rootScope,
    private $scope,
  ) {
    this.$scope.user = this.$rootScope.user;
  }

  static $inject = [
    "$rootScope",
    "$scope"
  ]
}

export default function feeds(): ng.IDirective {
  return {
    restrict: 'E',
    scope: {
      "isLoading": "=isLoading",
      "feeds": "=feeds",
      "user": "=user",
      "loadMore": "&loadMore",
      "upvote": "=onUpvote",
      "isUpvoting": "<",
    },
    template,
    controller: FeedsDirectiveCtrl
  };
};
