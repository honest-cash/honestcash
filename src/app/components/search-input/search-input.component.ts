import './search-input.styles.less';
import template from './search-input.template.html';

interface IScopeUpvoteButtonCtrl extends ng.IScope {
  isAnimated: boolean;
  fullWidth: boolean;
  term: string;
  onClick: (e) => void;
}

class SearchInputController {
  public static $inject = [
    '$scope',
    '$state',
  ];

  constructor(
    private $scope: IScopeUpvoteButtonCtrl,
    private $state: ng.ui.IStateService,  
  ) {
    this.ngOnInit();
  }

  private isAnimated: boolean;
  private fullWidth: boolean;
  private term: string;

  private ngOnInit() {

    this.isAnimated = this.$scope.isAnimated;
    this.fullWidth = this.$scope.fullWidth;

  }

  private onClick(e) {
    if(!this.term) {
      return;
    }
    this.redirectToSearchPage();
    this.term = '';
  }

  private redirectToSearchPage() {
    this.$state.go('vicigo.search', {term: this.term, page: 1});
  }


}

export default function searchInput(): ng.IDirective {
  return {
    controller: SearchInputController,
    controllerAs: 'searchInputCtrl',
    restrict: 'E',
    scope: {
      isAnimated: '=',
      fullWidth: '=',
    },
    replace: true,
    template
  };
}
