import {NgModule} from '@angular/core';
import {WalletReceiptComponent} from './components/receipt/receipt.component';
import {WalletTransactionButtonComponent} from './components/transaction-button/transaction-button.component';
import {SharedModule} from '../../core/shared.module';

@NgModule({
  declarations: [
    WalletReceiptComponent,
    WalletTransactionButtonComponent,
  ],
  imports: [
    SharedModule,
  ],
  entryComponents: [
    WalletReceiptComponent,
  ],
  exports: [
    WalletReceiptComponent,
    WalletTransactionButtonComponent,
  ],
})
export class WalletSharedModule {
}
