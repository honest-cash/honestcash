import {NgModule} from '@angular/core';
import {SharedModule} from '../../core/shared.module';
import {UserProfileMenuComponent} from './components/profile-menu/profile-menu.component';
import {UserFollowButtonComponent} from './components/follow-button/follow-button.component';
import {WalletSharedModule} from '../wallet/wallet-shared.module';

@NgModule({
  declarations: [
    UserProfileMenuComponent,
    UserFollowButtonComponent,
  ],
  imports: [
    SharedModule,
    WalletSharedModule,
    UserService,
  ],
  exports: [
    UserProfileMenuComponent,
    UserFollowButtonComponent,
  ],
})
export class UserSharedModule {
}
