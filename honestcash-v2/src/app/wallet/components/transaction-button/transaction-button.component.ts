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
import {ToastrService} from 'ngx-toastr';
import {Logger} from 'core/shared/services/logger.service';

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
  private logger = new Logger('WalletTransactionButtonComponent');
  public isProcessing = false;
  private readonly isPlatformBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private store: Store<AppStates>,
    private toastr: ToastrService,
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

  public async onClick() {
    if (!this.user) {
      this.router.navigate(['/login']);

      return;
    }

    if (!this.wallet) {
      this.toastr.error(
        'Not possible',
        undefined,
        {positionClass: 'toast-bottom-right'}
      );

      return;
    }

    if (!this.story) {
      this.toastr.error(
        'You can only upvote stories',
        undefined,
        {positionClass: 'toast-bottom-right'}
      );
    }

    if (!this.story.user.addressBCH) {
      this.toastr.error(
        'Author does not receive tips.',
        undefined,
        {positionClass: 'toast-bottom-right'}
      );

      return;
    }

    if (this.story.userId === this.user.id) {
      this.toastr.error(
        'You cannot tip yourself.',
        undefined,
        {positionClass: 'toast-bottom-right'}
      );

      return;
    }

    this.isProcessing = true;
    let transaction: ITransaction;

    const fnName = this.transactionType === TRANSACTION_TYPES.Upvote ? 'upvote' : 'unlock';

    try {
      transaction = await this.exchangeService[fnName](this.wallet, this.story, this.user, this.costInBch);
    } catch (err) {
      this.isProcessing = false;

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
          'Problems with broadcasting transaction (no matching script found)',
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

    this.isProcessing = false;

    const modalRef = this.modalService.open(WalletReceiptComponent);

    modalRef.componentInstance.transaction = transaction;
    modalRef.componentInstance.transactionType = this.transactionType;
    modalRef.componentInstance.story = this.story;

    this.onTransactionComplete(transaction);
  }
}
