import {NgModule} from '@angular/core';
import {WalletContainerComponent} from './wallet-container.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../core/shared.module';
import {WalletRoutingModule} from './wallet-routing.module';
import {WalletSharedModule} from './wallet-shared.module';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {QRCodeModule} from 'angularx-qrcode';
import {LayoutModule} from '../../core/layout.module';


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
    LayoutModule,
    ScrollToModule.forRoot(),
    QRCodeModule,
  ],
  providers: [],
  bootstrap: [WalletContainerComponent]
})
export class WalletModule {
}
