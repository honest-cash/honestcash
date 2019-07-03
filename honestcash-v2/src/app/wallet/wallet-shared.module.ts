import {NgModule} from '@angular/core';
import {WalletReceiptComponent} from './components/receipt/receipt.component';
import {WalletTransactionButtonComponent} from './components/transaction-button/transaction-button.component';
import {SharedModule} from '../../core/shared.module';
import {WalletService} from './services/wallet.service';
import {WalletEffects} from './store/wallet.effects';
import {SharedComponentsModule} from '../../core/shared-components.module';

@NgModule({
  declarations: [
    WalletReceiptComponent,
    WalletTransactionButtonComponent,
  ],
  providers: [
    WalletService,
    WalletEffects,
  ],
  imports: [
    SharedModule,
    SharedComponentsModule,
  ],
  entryComponents: [
    WalletReceiptComponent,
  ],
  exports: [
    SharedModule,
    SharedComponentsModule,
    WalletReceiptComponent,
    WalletTransactionButtonComponent,
  ],
})
export class WalletSharedModule {
}
