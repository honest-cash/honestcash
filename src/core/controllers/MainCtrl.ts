import { IGlobalScope } from "../../core/lib/interfaces";
import ScopeService from "../../core/services/ScopeService";
import WalletService from "../../core/services/WalletService";
import qrcode from "qrcode";
import UserPropsService from "../services/UserPropsService";

interface IScopeMainCtrl extends ng.IScope {
  mouseEnterAddress: any;
  mouseLeaveAddress: any;
  checkRecoveryBackup: () => void;
}

export default class MainCtrl {
  public static $inject = [
    "$rootScope",
    "$scope",
    "$state",
    "scopeService",
    "walletService",
    "userPropsService",
  ];

  constructor(
    private $rootScope: IGlobalScope,
    private $scope: IScopeMainCtrl,
    private $state: ng.ui.IStateService,
    private scopeService: ScopeService,
    private walletService: WalletService,
    private userPropsService: UserPropsService,
  ) {
    $scope.$on("$viewContentLoaded", async () => {
      const { bch, usd } = await this.walletService.getAddressBalances();

      $rootScope.walletBalance = {
        bch,
        usd,
        isLoading: false,
      };
    });

    const mouseEnterAddress = (className, address) => {
      const container = document.getElementsByClassName(className)[0];

      container.innerHTML = "";

      new qrcode(container, address);
    };

    const mouseLeaveAddress = (className) => {
      const container = document.getElementsByClassName(className)[0];
      container.innerHTML = "";
    };

    $scope.mouseEnterAddress = mouseEnterAddress;
    $scope.mouseLeaveAddress = mouseLeaveAddress;

    $scope.checkRecoveryBackup = () => {
      return this.userPropsService.checkRecoveryBackup();
    };
  }
}
