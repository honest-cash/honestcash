import sweetalert from "sweetalert";

import "./unlock-button.styles.less";
import unlockButtonTemplateHtml from "./unlock-button.template.html";
import qrcode from "qrcode";

import { IGlobalScope } from "../../../core/lib/interfaces";
import * as simpleWalletProvider from "../../../core/lib/simpleWalletProvider";
import { Post } from "../../../core/models/models";
import PostService from "../../../core/services/PostService";
import ScopeService from "../../../core/services/ScopeService";
import WalletService, {ICurrencyConversion} from "../../../core/services/WalletService";
import { IModalElement } from "../../../core/lib/dependency-interfaces";

declare const toastr;
declare const bitbox;

const defaultOptions = {
  isDisabled: false,
  isUnlocking: false,
  loadingText: "Unlocking...",
  text: "Unlock",
};

interface IScopeUnlockButtonCtrl extends ng.IScope {
  post: Post;
}

class UnlockButtonController {
  public static $inject = [
    "$rootScope",
    "$scope",
    "$window",
    "PostService",
    "WalletService",
    "ScopeService",
  ];

  private amount: number;
  private text: string;
  private hoverText: string;
  private loadingText: string;
  private isUnlocking: boolean;
  private isDisabled: boolean;
  private post: Post;
  private paidSectionCostCurrencies: ICurrencyConversion;

  constructor(
    private $rootScope: IGlobalScope,
    private $scope: IScopeUnlockButtonCtrl,
    private $window: ng.IWindowService,
    private postService: PostService,
    private walletService: WalletService,
    private scopeService: ScopeService,
  ) {
    this.ngOnInit();
  }

  private async ngOnInit() {
    this.paidSectionCostCurrencies = await this.walletService.convertUSDtoBCH(this.$scope.post.paidSectionCost);
    this.text = `GET ACCESS FOR ${this.paidSectionCostCurrencies.usd} USD`;
    this.hoverText = `UNLOCK NOW`;
    this.loadingText = `UNLOCKING...`;

    this.post = this.$scope.post;
    this.amount = this.paidSectionCostCurrencies.usd;
    this.isUnlocking = defaultOptions.isUnlocking;
    this.isDisabled = !this.$rootScope.user || this.post.userId === this.$rootScope.user.id;

    this.$window.onbeforeunload = (event) => {
      if (this.isUnlocking) {
        event.preventDefault();

        return "There is a pending transaction in process. Are you sure you want to leave?";
      }
    };
  }

  private async onClick(e) {
    if (this.isUnlocking || this.isDisabled) {
      e.stopPropagation();
      return;
    }

    const confirmationResult = await sweetalert({
      title: "Confirm your purchase",
      text: `You will be unlocking the full version of this story` +
        ` for ${this.paidSectionCostCurrencies.usd} USD (${this.paidSectionCostCurrencies.bch} BCH). Are you sure?`,
      icon: "warning",
      buttons: true,
      dangerMode: false,
    });

    if (confirmationResult) {
      this.unlock();
    }
  }

  /**
   * Unlocks a section in the post and saves a transaction reference in Honest database
   */
  private async unlock() {
    if (!this.$rootScope.user) {
      return (location.href = "/signup");
    }

    if (!this.post.user.addressBCH) {
      toastr.error(
        "Unlocking is not possible because the author does not have a Bitcoin address to receive",
      );
      return;
    }

    const postId = this.post.id;

    if (this.post.userId === this.$rootScope.user.id) {
      toastr.error(
        "Unlocking is not possible because you cannot unlock your own posts and responses",
      );
      return;
    }

    const simpleWallet = simpleWalletProvider.get();
    this.isUnlocking = true;

    this.scopeService.safeApply(this.$scope);

    let tx;

    const HONEST_CASH_PAYWALL_SHARE = 0.2;

    const paidSectionCostInSatoshis = bitbox.BitcoinCash.toSatoshi(this.paidSectionCostCurrencies.bch);
    const honestCashShare = paidSectionCostInSatoshis * HONEST_CASH_PAYWALL_SHARE;
    const authorShare = paidSectionCostInSatoshis - honestCashShare;

    const receiverAuthor = {
      address: this.post.user.addressBCH,
      amountSat: authorShare,
    };

    const receiverHonestCash = {
      address: "bitcoincash:qrk9kquyydvqn60apxuxnh5jk80p0nkmquwvw9ea95",
      amountSat: honestCashShare,
    };

    toastr.info("Unlocking...");

    try {
      tx = await simpleWallet.send([
        receiverAuthor,
        receiverHonestCash,
        {
          opReturn: ["0x4802", postId.toString()],
        },
      ]);
    } catch (err) {
      if (err.message && err.message.indexOf("Insufficient") > -1) {
        const addressContainer = document.getElementById(
          "load-wallet-modal-address",
        ) as HTMLInputElement;
        const legacyAddressContainer = document.getElementById(
          "load-wallet-modal-legacy-address",
        ) as HTMLInputElement;
        const qrContainer = document.getElementById(
          "load-wallet-modal-qr",
        ) as HTMLDivElement;

        addressContainer.value = simpleWallet.cashAddress;
        legacyAddressContainer.value = simpleWallet.legacyAddress;

        qrContainer.innerHTML = "";

        new qrcode(qrContainer, simpleWallet.cashAddress);

        // replace with sweetalert
        ($("#loadWalletModal") as IModalElement).modal("show");

        this.isUnlocking = false;
        this.scopeService.safeApply(this.$scope);

        return toastr.warning("Insufficient balance on your BCH account.");
      }

      if (err.message && err.message.indexOf("has no matching Script") > -1) {
        this.isUnlocking = false;
        this.scopeService.safeApply(this.$scope);

        return toastr.warning(
          "Could not find an unspent bitcoin that is big enough",
        );
      }

      this.isUnlocking = false;
      this.scopeService.safeApply(this.$scope);

      return toastr.warning("Error. Try again later.");
    }

    const url = `https://explorer.bitcoin.com/bch/tx/${tx.txid}`;
    const anchorEl = document.getElementById(
      "bchUnlockingTransactionUrl",
    ) as HTMLAnchorElement;
    anchorEl.innerHTML = `Receipt: ${tx.txid.substring(0, 9)}...`;
    anchorEl.href = url;

    const amountEl = document.getElementById(
      "unlockSuccessModalAmount",
    ) as HTMLAnchorElement;
    amountEl.innerHTML = this.paidSectionCostCurrencies.bch.toString();

    ($("#unlockSuccessModal") as IModalElement).modal("show");

    console.log(`Unlock transaction: ${url}`);

    await this.postService.unlock({
      postId,
      txId: tx.txid,
    });

    const { bch, usd } = await this.walletService.getAddressBalances();

    this.$rootScope.walletBalance = {
      bch,
      usd,
      isLoading: false,
    };
    this.isUnlocking = false;
    this.scopeService.safeApply(this.$scope, () => {});

    location.reload();
  }
}

export default function unlockButton(): ng.IDirective {
  return {
    controller: UnlockButtonController,
    controllerAs: "unlockButtonCtrl",
    restrict: "E",
    scope: {
      post: "=",
    },
    replace: true,
    template: unlockButtonTemplateHtml,
  };
}
