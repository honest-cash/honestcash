import './bottom-call-to-action-bar.styles.less';
import template from './bottom-call-to-action-bar.template.html';
import { Post } from '../../../core/models/models';

interface IBottomCallToActionBarControllerScope {
  post: Post;
  onClick: () => void;
}

class BottomCallToActionBarController {
  public static $inject = ['$scope'];
  public post: Post;

  constructor(
    private $scope: IBottomCallToActionBarControllerScope
  ) {
    this.ngOnInit();
  }

  private ngOnInit() {
    this.post = this.$scope.post;
    this.$scope.onClick = () => this.onClick();
  }

  private onClick() {
    window.location.href = '/signup';
  }

}

export default function bottomCallToActionBar(): ng.IDirective {
  return {
    controller: BottomCallToActionBarController,
    controllerAs: 'bottomCallToActionBarCtrl',
    restrict: 'E',
    scope: {
      post: '='
    },
    replace: true,
    template
  };
}
