import "./simple-ledger-protocol-details.styles.less";
import
  simpleLedgerProtocolDetailsTemplateHtml
from "./simple-ledger-protocol-details.template.html";

import tippyJs from "tippy.js";
import "tippy.js/dist/tippy.css";
import { User } from "../../../core/models/models";
import BitcoinComService from "../../../core/services/BitcoinComService";
import ScopeService from "../../../core/services/ScopeService";

interface ISimpleLedgerProtocolDetailsScope extends ng.IScope{
  address: string;
  profile: User;
  isVisible: boolean;
}

class SimpleLedgerProtocolDetailsController {
  public static $inject = [
    "$scope",
    "BitcoinComService",
    "ScopeService",
  ];

  public addressBCH: string;
  public addressSLP: string;
  public balanceSLP: string;
  public isVisible: boolean = false;

  constructor(
    private $scope: ISimpleLedgerProtocolDetailsScope,
    private bitcoinComService: BitcoinComService,
    private scopeService: ScopeService,
  ) {
    this.ngOnInit();
  }

  private async ngOnInit() {
    this.addressSLP = this.$scope.profile.addressSLP;

    if (!this.addressSLP) {
      return;
    }

    const balanceResult = await this.bitcoinComService.getSLPAddressBalance(this.addressSLP);

    const token = balanceResult.find(
      balance =>
        balance.tokenId === "c35a87afad11c8d086c1449ffd8b0a84324e72b15b1bcfdf166a493551b4eea6",
    );

    if (!token) {
      return;
    }

    // tslint:disable-next-line: radix
    const balance = parseInt(token.balance);

    if (balance <= 0) {
      return;
    }

    this.isVisible = true;

    this.balanceSLP = `${Math.round(balance / 1000)}K`;

    this.scopeService.safeApply(this.$scope);

    tippyJs(".hc-tokens-badge", {
      content: `Proud owner of ${this.balanceSLP} Honest Tokens`,
    });
  }
}

export default function simpleLedgerProtocolDetails(): ng.IDirective {
  return {
    controller: SimpleLedgerProtocolDetailsController,
    controllerAs: "simpleLedgerProtocolDetailsCtrl",
    restrict: "E",
    scope: {
      profile: "=",
    },
    replace: true,
    template: simpleLedgerProtocolDetailsTemplateHtml,
  };
}
