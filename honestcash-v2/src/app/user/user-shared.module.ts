import {NgModule} from '@angular/core';
import {SharedModule} from '../../core/shared.module';
import {UserProfileMenuComponent} from './components/profile-menu/profile-menu.component';
import {UserFollowButtonComponent} from './components/follow-button/follow-button.component';
import {WalletSharedModule} from '../wallet/wallet-shared.module';
import {UserBalanceComponent} from './components/balance/balance.component';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './store/user.effects';
import {SharedComponentsModule} from '../../core/shared-components.module';
import {LayoutModule} from '../../core/layout.module';

@NgModule({
  declarations: [
    UserProfileMenuComponent,
    UserFollowButtonComponent,
    UserBalanceComponent,
  ],
  imports: [
    SharedModule,
    SharedComponentsModule,
  ],
  exports: [
    SharedModule,
    SharedComponentsModule,
    UserProfileMenuComponent,
    UserFollowButtonComponent,
    UserBalanceComponent,
  ],
})
export class UserSharedModule {
}
