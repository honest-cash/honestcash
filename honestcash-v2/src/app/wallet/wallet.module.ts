import {NgModule} from '@angular/core';
import {WalletContainerComponent} from './wallet-container.component';
import {FormsModule} from '@angular/forms';
import {WalletRoutingModule} from './wallet-routing.module';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {EffectsModule} from '@ngrx/effects';
import {WalletEffects} from './store/wallet.effects';
import {WalletSharedModule} from './wallet-shared.module';
import {LayoutModule} from '../../core/layout.module';


@NgModule({
  declarations: [
    WalletContainerComponent,
  ],
  imports: [
    FormsModule,
    WalletRoutingModule,
    WalletSharedModule,
    ScrollToModule.forRoot(),
    LayoutModule,
  ],
  bootstrap: [WalletContainerComponent]
})
export class WalletModule {
}
