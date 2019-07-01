import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ITransaction, TRANSACTION_TYPES} from '../../models/transaction';
import {WalletService} from '../../../../app/wallet/services/wallet.service';
import {NgbModal, NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {ISimpleWallet} from '../../../../app/wallet/models/simple-wallet';
import {combineLatest} from 'rxjs';
import {WalletState} from '../../../../app/wallet/store/wallet.state';
import {Store} from '@ngrx/store';
import {AppStates, selectStoryState, selectUserState, selectWalletState} from '../../../../app/app.states';
import {UserState} from '../../../../app/user/store/user.state';
import User from '../../../../app/user/models/user';
import {Router} from '@angular/router';
import Story from '../../../../app/story/models/story';
import {StoryState} from '../../../../app/story/store/story.state';
import {TransactionService} from '../../services/transaction.service';
import {SharedReceiptComponent} from '../receipt/receipt.component';
import {WalletBalanceUpdated} from '../../../../app/wallet/store/wallet.actions';
import {WALLET_STATUS} from '../../../../app/wallet/models/status';

@Component({
  selector: 'shared-transaction-button',
  templateUrl: `./transaction-button.component.html`,
  styleUrls: ['./transaction-button.component.scss'],
})
export class SharedTransactionButtonComponent implements OnInit {
  @ViewChild('popover') public popover: NgbPopover;
  @Input() public onTransactionComplete: Function;
  @Input() public transactionType: TRANSACTION_TYPES;
  @Input() public actionText: string;
  @Input() public actionLoadingText: string;
  @Input() public costInDollars: number;
  public costInBch: number;
  public isLoading = true;
  public wallet: ISimpleWallet;
  public user: User;
  public story: Story;
  public isProcessing = false;

  constructor(
    private router: Router,
    private store: Store<AppStates>,
    private walletService: WalletService,
    private transactionService: TransactionService,
    private modalService: NgbModal,
  ) {
  }

  public ngOnInit() {
    combineLatest(
      this.store.select(selectStoryState),
      this.store.select(selectUserState),
      this.store.select(selectWalletState),
    ).subscribe((state: [StoryState, UserState, WalletState]) => {
      this.story = state[0].story;
      this.user = state[1].user;


      if (state[2].status === WALLET_STATUS.Generated) {
        this.wallet = state[2].wallet;
      }
    });
    if (this.transactionType === TRANSACTION_TYPES.Upvote) {
      this.costInDollars = 0.1;
    }

    if (this.transactionType === TRANSACTION_TYPES.Unlock) {
      this.costInDollars = this.story.paidSectionCost;
    }

    this.walletService.convertCurrency(this.costInDollars, 'usd', 'bch')
      .subscribe((costInBch: number) => {
        this.costInBch = Number(costInBch.toFixed(5));
        this.isLoading = false;
      });
  }

  public onClick() {
    this.popover.close();
    this.isProcessing = true;
    if (this.user) {
      let transactionPromise: Promise<ITransaction>;
      if (this.transactionType === TRANSACTION_TYPES.Upvote) {
        transactionPromise = this.transactionService.upvote(this.wallet, this.story, this.user, this.costInBch);
      } else if (this.transactionType === TRANSACTION_TYPES.Unlock) {
        transactionPromise = this.transactionService.unlock(this.wallet, this.story, this.user, this.costInBch);
      }
      if (transactionPromise) {
        transactionPromise.then((transaction: ITransaction) => {
          this.isProcessing = false;
          const modalRef = this.modalService.open(SharedReceiptComponent);
          modalRef.componentInstance.transaction = transaction;
          modalRef.componentInstance.transactionType = this.transactionType;
          this.onTransactionComplete(transaction);
        });
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  public openPopover() {
    this.popover.open();
  }

  public closePopover() {
    this.popover.close();
  }
}
