import {NgModule} from '@angular/core';
import {AuthLoginComponent} from '../auth/pages/login/login.component';
import {AuthLogoutComponent} from '../auth/pages/logout/logout.component';
import {AuthSignupComponent} from '../auth/pages/signup/signup.component';
import {AuthResetPasswordRequestComponent} from '../auth/pages/reset-password-request/reset-password-request.component';
import {AuthWelcomeComponent} from '../auth/pages/welcome/welcome.component';
import {AuthContainerComponent} from './auth-container.component';
import {FormsModule} from '@angular/forms';
import {AuthFooterComponent} from '../auth/components/footer/footer.component';
import {AuthHeadingComponent} from '../auth/components/heading/heading.component';
import {AuthCardFooterComponent} from '../auth/components/card/footer/footer.component';
import {AuthLoadingSubmitButtonComponent} from '../auth/components/loading-submit-button/loading-submit-button.component';
import {AuthThankYouComponent} from '../auth/pages/thank-you/thank-you.component';
import {AuthForbiddenUsernameValidatorDirective} from './directives/forbidden-username.directive';
import {AuthResetPasswordVerifyComponent} from '../auth/pages/reset-password-verify/reset-password-verify.component';
import {AuthHeaderComponent} from './components/header/header.component';
import {SharedModule} from '../../core/shared.module';
import {AuthRoutingModule} from './auth-routing.module';
import {UserSharedModule} from '../user/user-shared.module';
import {WalletSharedModule} from '../wallet/wallet-shared.module';
import {AuthSharedModule} from './auth-shared.module';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './store/auth.effects';

@NgModule({
  declarations: [
    AuthHeadingComponent,
    AuthLoadingSubmitButtonComponent,
    AuthHeaderComponent,
    AuthFooterComponent,
    AuthCardFooterComponent,
    AuthLoginComponent,
    AuthLogoutComponent,
    AuthSignupComponent,
    AuthWelcomeComponent,
    AuthResetPasswordRequestComponent,
    AuthResetPasswordVerifyComponent,
    AuthContainerComponent,
    AuthThankYouComponent,
    AuthForbiddenUsernameValidatorDirective,
  ],
  imports: [
    FormsModule,
    AuthRoutingModule,
    AuthSharedModule,
    SharedModule,
    UserSharedModule,
    WalletSharedModule,
  ],
  bootstrap: [AuthContainerComponent]
})
export class AuthModule {
}
