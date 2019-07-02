import {NgModule} from '@angular/core';
import {SharedModule} from '../../core/shared.module';
import {UserProfileMenuComponent} from './components/profile-menu/profile-menu.component';
import {WalletSharedModule} from '../wallet/wallet-shared.module';

@NgModule({
  declarations: [
    UserProfileMenuComponent,
  ],
  imports: [
    SharedModule,
    WalletSharedModule,
  ],
  exports: [
    UserProfileMenuComponent,
  ],
})
export class UserSharedModule {
}
