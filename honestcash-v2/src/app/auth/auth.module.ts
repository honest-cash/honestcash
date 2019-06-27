import {NgModule} from '@angular/core';
import {LoginComponent} from '../auth/pages/login/login.component';
import {LogoutComponent} from '../auth/pages/logout/logout.component';
import {SignupComponent} from '../auth/pages/signup/signup.component';
import {ResetPasswordRequestComponent} from '../auth/pages/reset-password-request/reset-password-request.component';
import {WelcomeComponent} from '../auth/pages/welcome/welcome.component';
import {AuthContainerComponent} from './auth-container.component';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {FooterComponent} from '../auth/components/footer/footer.component';
import {HeadingComponent} from '../auth/components/heading/heading.component';
import {CardFooterComponent} from '../auth/components/card/footer/footer.component';
import {LoadingSubmitButtonComponent} from '../auth/components/loading-submit-button/loading-submit-button.component';
import {AuthorizedGuard} from 'core/shared/guards/authorized.guard';
import {UnauthorizedGuard} from 'core/shared/guards/unauthorized.guard';
import {ThankYouComponent} from '../auth/pages/thank-you/thank-you.component';
import {ForbiddenUsernameValidatorDirective} from '../auth/shared/directives/forbidden-username.directive';
import {ResetPasswordVerifyComponent} from '../auth/pages/reset-password-verify/reset-password-verify.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {WelcomeHeaderComponent} from '../auth/components/welcome-header/welcome-header.component';
import {SharedModule} from '../../core/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AuthContainerComponent,
    children: [
      {
        path: 'welcome',
        component: WelcomeComponent,
        canActivate: [UnauthorizedGuard]
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [UnauthorizedGuard],
      },
      {path: 'logout', component: LogoutComponent, canActivate: [AuthorizedGuard]},
      {
        path: 'signup',
        component: SignupComponent,
        canActivate: [UnauthorizedGuard],
      },
      {
        path: 'reset-password-request/:resetCode',
        component: ResetPasswordVerifyComponent,
        canActivate: [UnauthorizedGuard]
      },
      {path: 'reset-password-request', component: ResetPasswordRequestComponent, canActivate: [UnauthorizedGuard]},
      {path: 'thank-you', component: ThankYouComponent, canActivate: [AuthorizedGuard]},
    ]
  },
];

@NgModule({
  declarations: [
    HeadingComponent,
    LoadingSubmitButtonComponent,
    WelcomeHeaderComponent,
    FooterComponent,
    CardFooterComponent,
    LoginComponent,
    LogoutComponent,
    SignupComponent,
    WelcomeComponent,
    ResetPasswordRequestComponent,
    ResetPasswordVerifyComponent,
    AuthContainerComponent,
    ThankYouComponent,
    ForbiddenUsernameValidatorDirective,
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
