import {NgModule} from '@angular/core';
import {WalletBalanceComponent} from './components/balance/balance.component';
import {WalletReceiptComponent} from './components/receipt/receipt.component';
import {WalletTransactionButtonComponent} from './components/transaction-button/transaction-button.component';
import {SharedModule} from '../../core/shared.module';
import {WalletService} from './services/wallet.service';
import {TransactionService} from './services/transaction.service';

@NgModule({
  declarations: [
    WalletBalanceComponent,
    WalletReceiptComponent,
    WalletTransactionButtonComponent,
  ],
  imports: [
    SharedModule,
  ],
  providers: [
    WalletService,
    TransactionService,
  ],
  entryComponents: [
    WalletReceiptComponent,
  ],
  exports: [
    WalletBalanceComponent,
    WalletReceiptComponent,
    WalletTransactionButtonComponent,
  ],
})
export class WalletSharedModule {
}
