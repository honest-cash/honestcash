import {NgModule} from '@angular/core';
import {SharedModule} from '../../core/shared.module';
import {UserProfileMenuComponent} from './components/profile-menu/profile-menu.component';
import {UserFollowButtonComponent} from './components/follow-button/follow-button.component';
import {WalletSharedModule} from '../wallet/wallet-shared.module';
import {UserBalanceComponent} from './components/balance/balance.component';

@NgModule({
  declarations: [
    UserProfileMenuComponent,
    UserFollowButtonComponent,
    UserBalanceComponent,
  ],
  imports: [
    SharedModule,
    WalletSharedModule,
  ],
  exports: [
    UserProfileMenuComponent,
    UserFollowButtonComponent,
    UserBalanceComponent,
  ],
})
export class UserSharedModule {
}
