import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Store} from '@ngrx/store';
import {AppStates} from '../../app.states';
import Story from '../../story/models/story';
import User from '../../user/models/user';
import {StoryService} from '../../story/services/story.service';
import {WalletService} from './wallet.service';
import {ISimpleWallet} from '../models/simple-wallet';
import {UpvoteTransactionStrategy} from './upvote.transaction.strategy';
import {ITransaction, ITRansactionResult} from '../models/transaction';
import {Logger} from '../../../core/shared/services/logger.service';
import {HttpService} from '../../../core/http/http.service';
import {LocalStorageToken} from '../../../core/shared/helpers/local-storage.helper';
import {isPlatformBrowser} from '@angular/common';
import {CurrencyService} from './currency.service';

declare var bitbox: any;

@Injectable({providedIn: 'root'})
export class ExchangeService {

  private readonly satoshiFactor = 100000000;

  private logger = new Logger('TransactionService');
  private readonly isPlatformBrowser: boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private http: HttpService,
    private store: Store<AppStates>,
    private toastr: ToastrService,
    private storyService: StoryService,
    private walletService: WalletService,
    private currencyService: CurrencyService,
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * Splits an upvote amount between previous upvotes
   * and saves the upvote reference in Honest database
   */
  public async upvote(wallet: ISimpleWallet, story: Story, user: User, amount: number): Promise<ITransaction> {
    if (!wallet) {
      this.toastr.error(
        'Upvoting is not possible',
        undefined,
        {positionClass: 'toast-bottom-right'}
      );
    }
    if (!story) {
      this.toastr.error(
        'You can only upvote stories',
        undefined,
        {positionClass: 'toast-bottom-right'}
      );
    }
    if (!user) {
      this.toastr.error(
        'Only logged in users can upvote',
        undefined,
        {positionClass: 'toast-bottom-right'}
      );
    }
    if (!story.user.addressBCH) {
      this.toastr.error(
        'Upvoting is not possible because the author does not have a Bitcoin address to receive',
        undefined,
        {positionClass: 'toast-bottom-right'}
      );
      return;
    }

    const storyId = story.id;

    /*if (story.userId === user.id) {
      this.toastr.error(
        'Upvoting is not possible because you cannot tip your own posts and responses',
        undefined,
        {positionClass: 'toast-bottom-right'}
      );
      return;
    }*/

    // users with connected BCH accounts
    let tx;
    let upvotes;

    try {
      upvotes = await this.storyService.getStoryUpvotes(storyId).toPromise();
    } catch (err) {
      this.toastr.error(
        'Could not get story upvotes',
        undefined,
        {positionClass: 'toast-bottom-right'}
      );

      this.logger.error(err);
      return;
    }

    let receivers: ITRansactionResult[] = UpvoteTransactionStrategy(
      amount * this.satoshiFactor,
      upvotes,
      story.user,
    );

    const bchToUsdRate = await this.currencyService.convertCurrency(1, 'bch', 'usd').toPromise();
    receivers = receivers.map(receiver => {
      return {
        ...receiver,
        amountDollars: Number(Number(amount) * Number(bchToUsdRate))
      };
    });

    this.logger.info('Sending BCH Transaction with the following receiver array:');
    this.logger.info(receivers);

    try {
      // tx = await wallet.send(receivers);
      tx = {
        txid: Math.random().toString(36).substring(7),
      };
    } catch (err) {
      if (err.message && err.message.indexOf('Insufficient') > -1) {
        this.toastr.warning(
          'Insufficient balance on your BCH account.',
          undefined,
          {positionClass: 'toast-bottom-right'}
        );

        // new qrcode(qrContainer, this.wallet.cashAddress);

        return;
      }

      if (err.message && err.message.indexOf('has no matching Script') > -1) {

        this.toastr.warning(
          'Could not find an unspent bitcoin that is big enough',
          undefined,
          {positionClass: 'toast-bottom-right'}
        );
        return;
      }

      this.logger.error(err);

      this.toastr.warning(
        'Error. Try again later.',
        undefined,
        {positionClass: 'toast-bottom-right'}
      );
      return;
    }


    const url = `https://explorer.bitcoin.com/bch/tx/${tx.txid}`;

    this.logger.info(`Upvote transaction: ${url}`);

    this.walletService.updateWalletBalance();

    return {
      postId: storyId,
      txId: tx.txid,
      receivers,
      sender: user,
    };
  }

  /**
   * Unlocks a section in the post and saves a transaction reference in Honest database
   */
  public async unlock(wallet: ISimpleWallet, story: Story, user: User, amount: number): Promise<ITransaction> {
    if (!wallet) {
      this.toastr.error(
        'Unlocking is not possible',
        undefined,
        {positionClass: 'toast-bottom-right'}
      );
    }
    if (!story) {
      this.toastr.error(
        'You can only unlock stories',
        undefined,
        {positionClass: 'toast-bottom-right'}
      );
    }
    if (!user) {
      this.toastr.error(
        'Only logged in users can unlock',
        undefined,
        {positionClass: 'toast-bottom-right'}
      );
    }
    if (!story.user.addressBCH) {
      this.toastr.error(
        'Unlocking is not possible because the author does not have a Bitcoin address to receive',
        undefined,
        {positionClass: 'toast-bottom-right'}
      );
      return;
    }

    const storyId = story.id;

    if (story.userId === user.id) {
      this.toastr.error(
        'Unlocking is not possible because you cannot unlock your own posts and responses',
        undefined,
        {positionClass: 'toast-bottom-right'}
      );
      return;
    }

    let tx;

    const HONEST_CASH_PAYWALL_SHARE = 0.2;
    const paidSectionCostInSatoshis = bitbox.BitcoinCash.toSatoshi(amount);
    const honestCashShare = paidSectionCostInSatoshis * HONEST_CASH_PAYWALL_SHARE;
    const authorShare = paidSectionCostInSatoshis - honestCashShare;

    const receiverAuthor = {
      address: story.user.addressBCH,
      amountSat: authorShare,
    };

    const receiverHonestCash = {
      address: 'bitcoincash:qrk9kquyydvqn60apxuxnh5jk80p0nkmquwvw9ea95',
      amountSat: honestCashShare,
    };

    try {
      /*tx = await wallet.send([
        receiverAuthor,
        receiverHonestCash,
        {
          opReturn: ['0x4802', storyId.toString()],
        },
      ]);*/
      tx = {
        txid: Math.random().toString(36).substring(7),
      };
    } catch (err) {
      if (err.message && err.message.indexOf('Insufficient') > -1) {
        this.toastr.warning(
          'Insufficient balance on your BCH account.',
          undefined,
          {positionClass: 'toast-bottom-right'}
        );
        return;
      }

      if (err.message && err.message.indexOf('has no matching Script') > -1) {
        this.toastr.warning(
          'Could not find an unspent bitcoin that is big enough',
          undefined,
          {positionClass: 'toast-bottom-right'}
        );
        return;
      }
      this.toastr.warning(
        'Error. Try again later.',
        undefined,
        {positionClass: 'toast-bottom-right'}
      );
      return;
    }

    const url = `https://explorer.bitcoin.com/bch/tx/${tx.txid}`;

    this.logger.info(`Unlock transaction: ${url}`);

    this.walletService.updateWalletBalance();

    return {
      postId: storyId,
      txId: tx.txid,
      sender: user,
    };
  }
}
