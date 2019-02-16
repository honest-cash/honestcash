import './simple-ledger-protocol-details.styles.less';
import template from './simple-ledger-protocol-details.template.html';

import tippy from "tippy.js";
import 'tippy.js/dist/tippy.css';
import { User } from '../../../core/models/models';
import BitcoinComService from '../../../core/services/BitcoinComService';
import ScopeService from '../../../core/services/ScopeService';

interface ISimpleLedgerProtocolDetailsScope extends ng.IScope{
  address: string;
  profile: User;
  isVisible: boolean;
}

class SimpleLedgerProtocolDetailsController {
  public static $inject = [
    '$scope',
    'BitcoinComService',
    'ScopeService'
  ];

  public addressBCH: string;
  public addressSLP: string;
  public balanceSLP: string;
  public isVisible: boolean = false;

  constructor(
    private $scope: ISimpleLedgerProtocolDetailsScope,
    private bitcoinComService: BitcoinComService,
    private scopeService: ScopeService
  ) {
    this.ngOnInit();
  }

  private ngOnInit() {
    this.addressBCH = this.$scope.profile.addressBCH;

    if (this.addressBCH) {
      this.bitcoinComService.convertBCHAddressToSLPAddress(this.addressBCH)
      .then(conversionResult => {
        this.addressSLP = conversionResult.slpAddress;
        this.bitcoinComService.getSLPAddressBalance(this.addressSLP)
        .then(balanceResult => {
          if (balanceResult.length) {
            const firstTransaction = balanceResult[0];
            const balance: number = parseInt(firstTransaction.balance);
            if (balance > 0) {
              this.balanceSLP = `${Math.round(balance / 1000)}K`;
              this.isVisible = true;

              this.scopeService.safeApply(this.$scope);

              tippy(".hc-tokens-badge", {
                content: `Proud owner of ${this.balanceSLP} Honest Tokens`
              });
            }
          }

        });
      });
    }
  }
}

export default function simpleLedgerProtocolDetails(): ng.IDirective {
  return {
    controller: SimpleLedgerProtocolDetailsController,
    controllerAs: 'simpleLedgerProtocolDetailsCtrl',
    restrict: 'E',
    scope: {
      profile: '=',
    },
    replace: true,
    template
  };
}
