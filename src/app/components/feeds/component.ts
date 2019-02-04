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

    $scope.checkRecoveryBackup = () => {
      if (this.$scope.user && this.$scope.user.userProperties && this.$scope.user.userProperties.length) {
        const recoveryBackedUpProp = this.$scope.user.userProperties.find(p => p.propKey === "recoveryBackedUp");
        return !recoveryBackedUpProp || !JSON.parse(recoveryBackedUpProp.propValue) ? true : false;
      } else if (!this.$scope.user.userProperties) {
        return false;
      }
      return true;
    }
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
