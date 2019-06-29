import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WalletBalanceComponent} from './components/balance/balance.component';

@NgModule({
  declarations: [
    WalletBalanceComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    WalletBalanceComponent,
  ],
})
export class WalletSharedModule {
}
