import {NgModule} from '@angular/core';
import {LayoutHeaderComponent} from './shared/components/header/header.component';
import {UserSharedModule} from '../app/user/user-shared.module';
import {WalletSharedModule} from '../app/wallet/wallet-shared.module';
import {SharedModule} from './shared.module';
import {WalletService} from '../app/wallet/services/wallet.service';

@NgModule({
  declarations: [
    LayoutHeaderComponent,
  ],
  providers: [
    WalletService,
  ],
  imports: [
    UserSharedModule,
    WalletSharedModule,
    SharedModule,
  ],
  exports: [
    LayoutHeaderComponent,
  ]
})
export class LayoutModule {
}
