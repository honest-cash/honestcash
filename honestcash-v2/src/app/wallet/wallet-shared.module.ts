import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WalletBalanceComponent} from './components/balance/balance.component';
import {SharedModule} from '../../core/shared.module';

@NgModule({
  declarations: [
    WalletBalanceComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    WalletBalanceComponent,
  ],
})
export class WalletSharedModule {
}
