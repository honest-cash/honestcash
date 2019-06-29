import {NgModule} from '@angular/core';
import {WalletContainerComponent} from './wallet-container.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../core/shared.module';
import {WalletRoutingModule} from './wallet-routing.module';
import {WalletSharedModule} from './wallet-shared.module';


@NgModule({
  declarations: [
    WalletContainerComponent,
  ],
  imports: [
    FormsModule,
    WalletRoutingModule,
    WalletSharedModule,
    CommonModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [WalletContainerComponent]
})
export class WalletModule {
}
