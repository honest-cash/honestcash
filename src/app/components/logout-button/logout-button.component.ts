import './logout-button.styles.less';
import template from './logout-button.template.html';

import { AuthService } from '../../../auth/AuthService';
import { IGlobalScope } from '../../../core/lib/interfaces';

import * as simpleWalletProvider from '../../../core/lib/simpleWalletProvider';

class LogoutButtonController {
  public static $inject = [
    '$rootScope',
    '$state',
    'AuthService',
  ];

  constructor(
    private $rootScope: IGlobalScope,
    private $state: ng.ui.IStateService,
    private AuthService: AuthService,
  ) {
    this.ngOnInit();
  }

  private ngOnInit() {}

  private onClick() {
    this.logout();
  }

  private logout = () => {
    AuthService.logout();

    this.$rootScope.user = undefined;
    this.$rootScope.simpleWallet = null;

    simpleWalletProvider.clean();

    this.$state.go('vicigo.feeds');

    location.reload();
  };

}

export default function logoutButton(): ng.IDirective {
  return {
    controller: LogoutButtonController,
    controllerAs: 'logoutButtonCtrl',
    restrict: 'E',
    replace: true,
    template
  };
}
