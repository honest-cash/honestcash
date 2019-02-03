import './follow-unfollow-button.styles.less';
import template from './follow-unfollow-button.template.html';

import { IGlobalScope } from '../../../core/lib/interfaces';

declare const angular;

interface IFollowUnfollowButtonController extends ng.IScope {
  user: any;
  showFollow: boolean;
  showUnfollow: boolean;
}

const defaultOptions = {
  showFollow: false,
  showUnfollow: false,
}

class FollowUnfollowButtonController {
  public static $inject = [
    '$rootScope',
    '$scope',
    'RelsService',
  ];

  constructor(
    private $rootScope: IGlobalScope,
    private $scope: IFollowUnfollowButtonController,
    private RelsService,
  ) {
    this.ngOnInit();
  }

  private isVisible: boolean;
  private user: any;
  private showFollow: boolean;
  private showUnfollow: boolean;

  private ngOnInit() {
    this.user = this.$scope.user;
    this.showUnfollow = angular.isDefined(this.$scope.showUnfollow)
    ? this.$scope.showUnfollow
    : defaultOptions.showUnfollow;
    this.showFollow = angular.isDefined(this.$scope.showFollow)
    ? this.$scope.showFollow
    : !this.$scope.showUnfollow ? true : defaultOptions.showFollow;
    this.isVisible = this.$rootScope.user && this.$rootScope.user.id !== undefined;
  }

  private onClick(action: "follow" | "unfollow") {
    switch (action) {
      case "follow":
        this.follow();
        break;
    
      case "unfollow":
        this.unfollow();
        break;
    
      default:
        break;
    }
  }

  private follow = () => {
    this.user.alreadyFollowing = !this.user.alreadyFollowing;

    this.RelsService.followProfile(this.user.id);
  };

  private unfollow = () => {
    if (this.user) {
      this.user.alreadyFollowing = false;
    }

    this.RelsService.unfollowProfile(this.user.id);
  };

}

export default function followUnfollowButton(): ng.IDirective {
  return {
    controller: FollowUnfollowButtonController,
    controllerAs: 'followUnfollowButtonCtrl',
    restrict: 'E',
    scope: {
      "showFollow": "=",
      "showUnfollow": "=",
      "user": "=",
    },
    template
  };
}
