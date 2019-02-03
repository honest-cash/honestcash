import { IGlobalScope } from '../../core/lib/interfaces';
import ScopeService from '../../core/services/ScopeService';
import WalletService from '../../core/services/WalletService';

interface IScopeMainCtrl extends ng.IScope {
  mouseEnterAddress: any;
  mouseLeaveAddress: any;
}

export default class MainCtrl {
  public static $inject = [
    '$rootScope',
    '$scope',
    '$state',
    'ScopeService',
    'WalletService'
  ];

  constructor(
    private $rootScope: IGlobalScope,
    private $scope: IScopeMainCtrl,
    private $state: ng.ui.IStateService,
    private scopeService: ScopeService,
    private walletService: WalletService
  ) {
    $scope.$on('$viewContentLoaded', async () => {
      const { bch, usd } = await this.walletService.getAddressBalances();

      $rootScope.walletBalance = {
        bch,
        usd,
        isLoading: false
      };
    });

    const mouseEnterAddress = (className, address) => {
      const container = document.getElementsByClassName(className)[0];

      container.innerHTML = '';

      new QRCode(container, address);
    };

    const mouseLeaveAddress = className => {
      const container = document.getElementsByClassName(className)[0];
      container.innerHTML = '';
    };

    $scope.mouseEnterAddress = mouseEnterAddress;
    $scope.mouseLeaveAddress = mouseLeaveAddress;

  }
}
