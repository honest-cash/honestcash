import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Store} from '@ngrx/store';
import {AppStates, selectWalletState} from '../../../app/app.states';
import {HttpService, Logger} from '../..';
import Story from '../../../app/story/models/story';
import User from '../../../app/user/models/user';
import {StoryService} from '../../../app/story/services/story.service';
import {WalletService} from '../../../app/wallet/services/wallet.service';
import {Observable, Subscription} from 'rxjs';
import {WalletState} from '../../../app/wallet/store/wallet.state';
import {ISimpleWallet} from '../../../app/wallet/models/simple-wallet';
import {UpvoteTransactionStrategy} from './upvote.transaction.strategy';
import {STORY_PROPERTIES} from '../../../app/story/store/story.actions';

declare var bitbox: any;

@Injectable({providedIn: 'root'})
export class TransactionService {

  private readonly amountInUSD = 0.1;
  private readonly satoshiFactor = 100000000;
  private amount = 0.00025;

  private logger = new Logger();
  private wallet: ISimpleWallet;
  private wallet$: Observable<WalletState>;
  private walletSub: Subscription;

  constructor(
    private http: HttpService,
    private store: Store<AppStates>,
    private toastr: ToastrService,
    private storyService: StoryService,
    private walletService: WalletService,
  ) {
    this.wallet$ = this.store.select(selectWalletState);
    this.walletSub = this.wallet$.subscribe((walletState: WalletState) => {
      this.wallet = walletState.wallet;
    });
  }

  private convertSatoshiToBch = (amountSat: number): string => {
    return (amountSat / this.satoshiFactor).toFixed(5);
  };

  /**
   * Splits an upvote amount between previous upvotes
   * and saves the upvote reference in Honest database
   */
  private async upvote(story: Story, upvoter: User) {
    if (!story.user.addressBCH) {
      this.toastr.error(
        'Upvoting is not possible because the author does not have a Bitcoin address to receive',
      );
      return;
    }

    const storyId = story.id;

    if (story.userId === upvoter.id) {
      this.toastr.error(
        'Upvoting is not possible because you cannot tip your own posts and responses',
      );
      return;
    }

    // users with connected BCH accounts
    let tx;
    let upvotes;

    try {
      upvotes = await this.storyService.getStoryUpvotes(storyId);
    } catch (err) {
      this.toastr.error('Could not get story upvotes');

      return this.logger.error(err);
    }

    const receivers = UpvoteTransactionStrategy(
      this.amount * this.satoshiFactor,
      upvotes,
      story.user,
    );

    this.toastr.info('Upvoting...');

    this.logger.info('Sending BCH Transaction with the following receiver array:');
    this.logger.info(receivers);

    try {
      tx = await this.wallet.send(receivers);
    } catch (err) {
      if (err.message && err.message.indexOf('Insufficient') > -1) {
        this.toastr.warning('Insufficient balance on your BCH account.');

        // new qrcode(qrContainer, this.wallet.cashAddress);

        return;
      }

      if (err.message && err.message.indexOf('has no matching Script') > -1) {

        return this.toastr.warning(
          'Could not find an unspent bitcoin that is big enough',
        );
      }

      this.logger.error(err);

      return this.toastr.warning('Error. Try again later.');
    }


    const url = `https://explorer.bitcoin.com/bch/tx/${tx.txid}`;

    this.logger.info(`Upvote transaction: ${url}`);

    const upvote = {
      txId: tx.txid,
      userPostId: story.id,
      userId: upvoter.id,
      user: upvoter,
    };

    this.storyService.saveProperty({property: STORY_PROPERTIES.Upvote, data: upvote, transaction: {postId: storyId, txId: tx.txid}});
  }

  /**
   * Unlocks a section in the post and saves a transaction reference in Honest database
   */
  private async unlock(story: Story, unlocker: User) {
    if (!story.user.addressBCH) {
      this.toastr.error(
        'Unlocking is not possible because the author does not have a Bitcoin address to receive',
      );
      return;
    }

    const storyId = story.id;

    if (story.userId === unlocker.id) {
      this.toastr.error(
        'Unlocking is not possible because you cannot unlock your own posts and responses',
      );
      return;
    }

    let tx;

    const HONEST_CASH_PAYWALL_SHARE = 0.2;
    const paidSectionCostInSatoshis = bitbox.BitcoinCash.toSatoshi(story.paidSectionCost);
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

    this.toastr.info('Unlocking...');

    try {
      tx = await this.wallet.send([
        receiverAuthor,
        receiverHonestCash,
        {
          opReturn: ['0x4802', storyId.toString()],
        },
      ]);
    } catch (err) {
      if (err.message && err.message.indexOf('Insufficient') > -1) {
        return this.toastr.warning('Insufficient balance on your BCH account.');
      }

      if (err.message && err.message.indexOf('has no matching Script') > -1) {
        return this.toastr.warning(
          'Could not find an unspent bitcoin that is big enough',
        );
      }
      return this.toastr.warning('Error. Try again later.');
    }

    const url = `https://explorer.bitcoin.com/bch/tx/${tx.txid}`;

    console.log(`Unlock transaction: ${url}`);

    const unlock = {
      txId: tx.txid,
      userPostId: story.id,
      userId: unlocker.id,
      user: unlocker,
    }

    this.storyService.saveProperty({property: STORY_PROPERTIES.Unlock, data: unlock, transaction: {postId: storyId, txId: tx.txid}});
  }

}
