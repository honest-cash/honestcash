import {NgModule} from '@angular/core';
import {LayoutHeaderComponent} from './shared/components/header/header.component';
import {SharedModule} from './shared.module';
import {SharedComponentsModule} from './shared-components.module';
import {UserSharedModule} from '../app/user/user-shared.module';
import {WalletSharedModule} from '../app/wallet/wallet-shared.module';

@NgModule({
  declarations: [
    LayoutHeaderComponent,
  ],
  imports: [
    SharedModule,
    SharedComponentsModule,
    UserSharedModule,
    WalletSharedModule,
  ],
  exports: [
    LayoutHeaderComponent,
  ]
})
export class LayoutModule {
}
