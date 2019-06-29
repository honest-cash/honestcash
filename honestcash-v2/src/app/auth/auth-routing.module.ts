import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizedGuard} from '../../core/shared/guards/authorized.guard';
import {AuthContainerComponent} from './auth-container.component';
import {AuthWelcomeComponent} from './pages/welcome/welcome.component';
import {UnauthorizedGuard} from '../../core/shared/guards/unauthorized.guard';
import {AuthLoginComponent} from './pages/login/login.component';
import {AuthLogoutComponent} from './pages/logout/logout.component';
import {AuthSignupComponent} from './pages/signup/signup.component';
import {AuthResetPasswordVerifyComponent} from './pages/reset-password-verify/reset-password-verify.component';
import {AuthResetPasswordRequestComponent} from './pages/reset-password-request/reset-password-request.component';
import {AuthThankYouComponent} from './pages/thank-you/thank-you.component';

/**
 * - More specific routes should come first
 */
const routes: Routes = [
  {
    path: '',
    component: AuthContainerComponent,
    children: [
      {
        path: 'welcome',
        component: AuthWelcomeComponent,
      },
      {
        path: 'login',
        component: AuthLoginComponent,
      },
      {
        path: 'logout',
        component: AuthLogoutComponent
      },
      {
        path: 'signup',
        component: AuthSignupComponent,
      },
      {
        path: 'reset-password-request/:resetCode',
        component: AuthResetPasswordVerifyComponent,
      },
      {
        path: 'reset-password-request',
        component: AuthResetPasswordRequestComponent,
      },
      {
        path: 'thank-you',
        component: AuthThankYouComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
