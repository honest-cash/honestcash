import {NgModule} from '@angular/core';
import {AuthLoginComponent} from '../auth/pages/login/login.component';
import {AuthLogoutComponent} from '../auth/pages/logout/logout.component';
import {AuthSignupComponent} from '../auth/pages/signup/signup.component';
import {AuthResetPasswordRequestComponent} from '../auth/pages/reset-password-request/reset-password-request.component';
import {AuthWelcomeComponent} from '../auth/pages/welcome/welcome.component';
import {AuthContainerComponent} from './auth-container.component';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthFooterComponent} from '../auth/components/footer/footer.component';
import {AuthHeadingComponent} from '../auth/components/heading/heading.component';
import {AuthCardFooterComponent} from '../auth/components/card/footer/footer.component';
import {AuthLoadingSubmitButtonComponent} from '../auth/components/loading-submit-button/loading-submit-button.component';
import {AuthorizedGuard} from 'core/shared/guards/authorized.guard';
import {UnauthorizedGuard} from 'core/shared/guards/unauthorized.guard';
import {AuthThankYouComponent} from '../auth/pages/thank-you/thank-you.component';
import {AuthForbiddenUsernameValidatorDirective} from '../auth/shared/directives/forbidden-username.directive';
import {AuthResetPasswordVerifyComponent} from '../auth/pages/reset-password-verify/reset-password-verify.component';
import {AuthHeaderComponent} from './components/header/header.component';
import {SharedModule} from '../../core/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AuthContainerComponent,
    children: [
      {
        path: 'welcome',
        component: AuthWelcomeComponent,
        canActivate: [UnauthorizedGuard]
      },
      {
        path: 'login',
        component: AuthLoginComponent,
        canActivate: [UnauthorizedGuard],
      },
      {path: 'logout', component: AuthLogoutComponent, canActivate: [AuthorizedGuard]},
      {
        path: 'signup',
        component: AuthSignupComponent,
        canActivate: [UnauthorizedGuard],
      },
      {
        path: 'reset-password-request/:resetCode',
        component: AuthResetPasswordVerifyComponent,
        canActivate: [UnauthorizedGuard]
      },
      {path: 'reset-password-request', component: AuthResetPasswordRequestComponent, canActivate: [UnauthorizedGuard]},
      {path: 'thank-you', component: AuthThankYouComponent, canActivate: [AuthorizedGuard]},
    ]
  },
];

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
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AuthContainerComponent]
})
export class AuthModule {
}
