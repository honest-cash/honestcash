import template from './template.html';

class FeedsDirectiveCtrl {

  public static $inject = [
    "$rootScope",
    "$scope"
  ];

  constructor(
    private $rootScope,
    private $scope,
  ) {
  }
}

export default function feeds(): ng.IDirective {
  return {
    restrict: 'E',
    scope: {
      "isLoading": "=isLoading",
      "feeds": "=feeds",
      "user": "=user",
      "loadMore": "&loadMore"
    },
    template,
    controller: FeedsDirectiveCtrl
  };
};
