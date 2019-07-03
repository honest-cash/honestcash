import {NgModule} from '@angular/core';
import {WalletContainerComponent} from './wallet-container.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../core/shared.module';
import {WalletRoutingModule} from './wallet-routing.module';
import {WalletSharedModule} from './wallet-shared.module';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {QRCodeModule} from 'angularx-qrcode';
import {LayoutModule} from '../../core/layout.module';
import {WalletService} from './services/wallet.service';


@NgModule({
  declarations: [
    WalletContainerComponent,
  ],
  providers: [
    WalletService,
  ],
  imports: [
    FormsModule,
    WalletRoutingModule,
    WalletSharedModule,
    SharedModule,
    LayoutModule,
    ScrollToModule.forRoot(),
    QRCodeModule,
  ],
  bootstrap: [WalletContainerComponent]
})
export class WalletModule {
}
