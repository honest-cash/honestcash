import {Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {ITransaction, TRANSACTION_TYPES} from '../../models/transaction';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ISimpleWallet} from '../../models/simple-wallet';
import {combineLatest} from 'rxjs';
import {WalletState} from '../../store/wallet.state';
import {Store} from '@ngrx/store';
import {AppStates, selectUserState, selectWalletState} from '../../../app.states';
import {UserState} from '../../../user/store/user.state';
import User from '../../../user/models/user';
import {Router} from '@angular/router';
import Story from '../../../story/models/story';
import {ExchangeService} from '../../services/exchange.service';
import {WalletReceiptComponent} from '../receipt/receipt.component';
import {WALLET_STATUS} from '../../models/status';
import {CurrencyService} from '../../services/currency.service';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'wallet-transaction-button',
  templateUrl: `./transaction-button.component.html`,
  styleUrls: ['./transaction-button.component.scss'],
  providers: [
    ExchangeService,
    CurrencyService,
  ]
})
export class WalletTransactionButtonComponent implements OnInit {
  @Input() public onTransactionComplete: Function;
  @Input() public transactionType: TRANSACTION_TYPES;
  @Input() public actionText: string;
  @Input() public actionLoadingText: string;
  @Input() public costInDollars: number;
  @Input() public isSmallButton: boolean;
  @Input() public story: Story;
  public costInBch: number;
  public isLoading = true;
  public wallet: ISimpleWallet;
  public user: User;
  public isProcessing = false;
  private readonly isPlatformBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private store: Store<AppStates>,
    private exchangeService: ExchangeService,
    private currencyService: CurrencyService,
    private modalService: NgbModal,
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
  }

  public ngOnInit() {
    combineLatest(
      this.store.select(selectUserState),
      this.store.select(selectWalletState),
    ).subscribe((state: [UserState, WalletState]) => {
      this.user = state[0].user;


      if (state[1].status === WALLET_STATUS.Generated) {
        this.wallet = state[1].wallet;
      }
    });
    if (this.transactionType === TRANSACTION_TYPES.Upvote) {
      this.costInDollars = 0.1;
    }

    if (this.transactionType === TRANSACTION_TYPES.Unlock) {
      this.costInDollars = this.story.paidSectionCost;
    }

    if (this.isPlatformBrowser) {
      this.currencyService.convertCurrency(this.costInDollars, 'usd', 'bch')
        .subscribe((costInBch: number) => {
          this.costInBch = Number(costInBch.toFixed(5));
          this.isLoading = false;
        });
    }
  }

  public onClick() {
    if (this.user) {
      this.isProcessing = true;
      let transactionPromise: Promise<ITransaction>;
      if (this.transactionType === TRANSACTION_TYPES.Upvote) {
        transactionPromise = this.exchangeService.upvote(this.wallet, this.story, this.user, this.costInBch);
      } else if (this.transactionType === TRANSACTION_TYPES.Unlock) {
        transactionPromise = this.exchangeService.unlock(this.wallet, this.story, this.user, this.costInBch);
      }
      if (transactionPromise) {
        transactionPromise.then((transaction: ITransaction) => {
          this.isProcessing = false;
          const modalRef = this.modalService.open(WalletReceiptComponent);
          modalRef.componentInstance.transaction = transaction;
          modalRef.componentInstance.transactionType = this.transactionType;
          modalRef.componentInstance.story = this.story;
          this.onTransactionComplete(transaction);
        });
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
