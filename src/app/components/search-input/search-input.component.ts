import './search-input.styles.less';
import template from './search-input.template.html';

import { IGlobalScope } from '../../../core/lib/interfaces';


interface IScopeUpvoteButtonCtrl extends ng.IScope {
  isAnimated: boolean;
}

class SearchInputController {
  public static $inject = [
    '$rootScope',
    '$scope',
  ];

  constructor(
    private $rootScope: IGlobalScope,
    private $scope: IScopeUpvoteButtonCtrl,
  ) {
    this.ngOnInit();
  }

  private isAnimated: boolean;

  private ngOnInit() {

    this.isAnimated = this.$scope.isAnimated;

  }

  private onClick(e) {
    this.search();
  }

  private async search() {

  }


}

export default function searchInput(): ng.IDirective {
  return {
    controller: SearchInputController,
    controllerAs: 'searchInputCtrl',
    restrict: 'E',
    scope: {
      isAnimated: '=',
    },
    replace: true,
    template
  };
}
