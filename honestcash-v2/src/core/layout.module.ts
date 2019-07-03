import {NgModule} from '@angular/core';
import {LayoutHeaderComponent} from './shared/components/header/header.component';
import {UserSharedModule} from '../app/user/user-shared.module';
import {WalletSharedModule} from '../app/wallet/wallet-shared.module';
import {SharedModule} from './shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    LayoutHeaderComponent,
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
