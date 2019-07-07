import {Injectable} from '@angular/core';
import Story from '../../story/models/story';
import User from '../../user/models/user';
import {StoryService} from '../../story/services/story.service';
import {WalletService} from './wallet.service';
import {ISimpleWallet} from '../models/simple-wallet';
import {UpvoteTransactionStrategy} from './upvote.transaction.strategy';
import {ITransaction, ITRansactionResult} from '../models/transaction';
import {Logger} from '../../../core/shared/services/logger.service';
import {CurrencyService} from './currency.service';

declare var bitbox: any;

@Injectable({providedIn: 'root'})
export class ExchangeService {
  private readonly satoshiFactor = 100000000;
  private readonly hcAddress = 'bitcoincash:qrk9kquyydvqn60apxuxnh5jk80p0nkmquwvw9ea95';
  private readonly logger = new Logger('TransactionService');

  constructor(
    private readonly storyService: StoryService,
    private readonly walletService: WalletService,
    private readonly currencyService: CurrencyService,
  ) {}

  /**
   * Splits an upvote amount between previous upvotes
   * and saves the upvote reference in Honest database
   */
  public async upvote(wallet: ISimpleWallet, story: Story, user: User, amount: number): Promise<ITransaction> {
    const storyId = story.id;

    this.logger.info(`Upvoting story ${story.id}`);

    // users with connected BCH accounts
    let tx;
    let upvotes;

    try {
      upvotes = await this.storyService.getStoryUpvotes(storyId).toPromise();
    } catch (err) {
      this.logger.error(err);

      throw new Error('Could not get story upvotes');
    }

    this.logger.info(`Calculating tip receivers.`);

    let receivers: ITRansactionResult[] = UpvoteTransactionStrategy(
      amount * this.satoshiFactor,
      upvotes,
      story.user,
    );

    this.logger.info(`Converting USD to BCH`);

    const bchToUsdRate = await this.currencyService.convertCurrency(1, 'bch', 'usd').toPromise();

    receivers = receivers.map(receiver => {
      return {
        ...receiver,
        amountDollars: Number(Number(amount) * Number(bchToUsdRate))
      };
    });

    this.logger.info('Sending BCH Transaction with the following receivers:');
    this.logger.info(receivers);

    tx = await wallet.send(receivers);

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
    const storyId = story.id;

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
      address: this.hcAddress,
      amountSat: honestCashShare,
    };

    tx = await wallet.send([
      receiverAuthor,
      receiverHonestCash,
      {
        opReturn: ['0x4802', storyId.toString()],
      },
    ]);

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
