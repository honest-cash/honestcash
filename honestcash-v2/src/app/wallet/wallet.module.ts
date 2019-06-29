import {NgModule} from '@angular/core';
import {WalletContainerComponent} from './wallet-container.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../core/shared.module';
import {WalletRoutingModule} from './wallet-routing.module';


@NgModule({
  declarations: [
    WalletContainerComponent,
  ],
  imports: [
    FormsModule,
    WalletRoutingModule,
    CommonModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [WalletContainerComponent]
})
export class WalletModule {
}
