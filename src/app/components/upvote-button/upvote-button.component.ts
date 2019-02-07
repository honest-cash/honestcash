import './upvote-button.styles.less';
import template from './upvote-button.template.html';

import { IGlobalScope } from '../../../core/lib/interfaces';
import { Post } from '../../../core/models/models';
import WalletService from '../../../core/services/WalletService';
import PostService from '../../../core/services/PostService';
import ScopeService from '../../../core/services/ScopeService';

import * as simpleWalletProvider from '../../../core/lib/simpleWalletProvider';
import * as upvoteDistribution from '../../../core/lib/upvoteDistribution';

declare const angular, toastr, QRCode;

const defaultOptions = {
  amount: 0.002,
  isDisabled: false,
  isUpvoting: false,
  loadingText: 'Upvoting...',
  text: 'Upvote'
};

interface IScopeUpvoteButtonCtrl extends ng.IScope {
  post: Post;
}

class UpvoteButtonController {
  public static $inject = [
    '$rootScope',
    '$scope',
    '$window',
    'PostService',
    'WalletService',
    'ScopeService',
  ];

  private amount: number;
  private text: string;
  private loadingText: string;
  private isUpvoting: boolean;
  private isDisabled: boolean;
  private post: Post;

  constructor(
    private $rootScope: IGlobalScope,
    private $scope: IScopeUpvoteButtonCtrl,
    private $window: ng.IWindowService,
    private postService: PostService,
    private walletService: WalletService,
    private scopeService: ScopeService,
  ) {
    this.ngOnInit();
  }

  private ngOnInit() {
    this.amount = angular.isDefined(this.amount)
      ? this.amount
      : defaultOptions.amount;
    this.text = angular.isDefined(this.text) ? this.text : defaultOptions.text;
    this.loadingText = angular.isDefined(this.loadingText)
      ? this.loadingText
      : defaultOptions.loadingText;

    this.post = this.$scope.post;
    this.isUpvoting = defaultOptions.isUpvoting;
    this.isDisabled = !this.$rootScope.user || this.post.userId === this.$rootScope.user.id;

    this.$window.onbeforeunload = event => {
      if (this.isUpvoting) {
        event.preventDefault();

        return 'There is a pending upvote in process. Are you sure you want to leave?';
      }
    };
  }

  private onClick(e) {
    if (this.isUpvoting || this.isDisabled) {
      e.stopPropagation();
      return;
    }
    this.upvote();
  }

  private satoshiToBch = (amountSat: number): string => {
    return (amountSat / 100000000).toFixed(5);
  };

  /**
   * Splits an upvote amount between previous upvotes and saves the upvote reference in Honest database
   */
  private async upvote() {
    if (!this.$rootScope.user) {
      return (location.href = '/signup');
    }

    if (!this.post.user.addressBCH) {
      toastr.error(
        'Upvoting is not possible because the author does not have a Bitcoin address to receive'
      );
      return;
    }

    const postId = this.post.id;

    if (this.post.userId == this.$rootScope.user.id) {
      toastr.error(
        'Upvoting is not possible because you cannot tip your own posts and responses'
      );
      return;
    }

    const simpleWallet = simpleWalletProvider.get();
    this.isUpvoting = true;

    this.scopeService.safeApply(this.$scope, () => {});

    // users with connected BCH accounts
    let tx;
    let upvotes;

    try {
      upvotes = await this.postService.getUpvotes(postId);
    } catch (err) {
      toastr.error("Can't connect.");

      return console.error(err);
    }

    const receivers = upvoteDistribution.determineUpvoteRewards(
      upvotes,
      this.post.user
    );

    toastr.info('Upvoting...');

    const distributionInfoEl = document.getElementById('distribution-info');

    distributionInfoEl.innerHTML = '';

    for (let receiver of receivers) {
      const el = document.createElement('div');

      let userHtml;

      if (receiver.user) {
        userHtml = `<a target="_self" href="/profile/${
          receiver.user.username
        }"><img style="border-radius:50%; width: 23px;" src="${
          receiver.user.imageUrl ? receiver.user.imageUrl : '/img/avatar.png'
        }" /> ${receiver.user.username}</a> ${
          this.post.userId === receiver.user.id ? '(Author)' : ''
        }`;
      } else {
        userHtml = `<img style="width: 23px;" src="/img/avatar.png" /> Anonymous`;
      }

      el.innerHTML = `${this.satoshiToBch(
        receiver.amountSat
      )} BCH -> ${userHtml}`;

      distributionInfoEl.appendChild(el);
    }

    // distribute only to testnet of owner
    // default tip is 100000 satoshis = 0.001 BCH, around 20 cents
    try {
      receivers.push({
        opReturn: ['0x4801', postId.toString()]
      });
      tx = await simpleWallet.send(receivers);
    } catch (err) {
      if (err.message && err.message.indexOf('Insufficient') > -1) {
        const addressContainer = document.getElementById(
          'load-wallet-modal-address'
        ) as HTMLInputElement;
        const legacyAddressContainer = document.getElementById(
          'load-wallet-modal-legacy-address'
        ) as HTMLInputElement;
        const qrContainer = document.getElementById(
          'load-wallet-modal-qr'
        ) as HTMLDivElement;

        addressContainer.value = simpleWallet.cashAddress;
        legacyAddressContainer.value = simpleWallet.legacyAddress;

        qrContainer.innerHTML = '';
        new QRCode(qrContainer, simpleWallet.cashAddress);

        // replace with sweetalert
        $('#loadWalletModal').modal('show');

        this.isUpvoting = false;
        this.scopeService.safeApply(this.$scope, () => {});

        return toastr.warning('Insufficient balance on your BCH account.');
      }

      if (err.message && err.message.indexOf('has no matching Script') > -1) {
        this.isUpvoting = false;
        this.scopeService.safeApply(this.$scope, () => {});

        return toastr.warning(
          'Could not find an unspent bitcoin that is big enough'
        );
      }

      console.error(err);

      this.isUpvoting = false;
      this.scopeService.safeApply(this.$scope, () => {});

      return toastr.warning('Error. Try again later.');
    }

    $('#tipSuccessModal').modal('show');

    const url = `https://explorer.bitcoin.com/bch/tx/${tx.txid}`;

    const anchorEl = document.getElementById(
      'bchTippingTransactionUrl'
    ) as HTMLAnchorElement;

    console.log(`Upvote transaction: ${url}`);

    anchorEl.innerHTML = `Receipt: ${tx.txid.substring(0, 9)}...`;
    anchorEl.href = url;

    this.postService.upvote({
      postId: postId,
      txId: tx.txid
    });

    const { bch, usd } = await this.walletService.getAddressBalances();

    this.$rootScope.walletBalance = {
      bch,
      usd,
      isLoading: false
    };
    this.isUpvoting = false;
    this.scopeService.safeApply(this.$scope, () => {});
  }
}

export default function upvoteButton(): ng.IDirective {
  return {
    controller: UpvoteButtonController,
    controllerAs: 'upvoteButtonCtrl',
    restrict: 'E',
    scope: {
      amount: '=?',
      loadingText: '=?',
      text: '=?',
      post: '='
    },
    replace: true,
    template
  };
}
