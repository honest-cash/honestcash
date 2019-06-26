import {NgModule} from '@angular/core';
import {LoginComponent} from './pages/login/login.component';
import {LogoutComponent} from './pages/logout/logout.component';
import {SignupComponent} from './pages/signup/signup.component';
import {ResetPasswordRequestComponent} from './pages/reset-password-request/reset-password-request.component';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {MainContainerComponent} from './main-container.component';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeadingComponent} from './components/heading/heading.component';
import {CardFooterComponent} from './components/card/footer/footer.component';
import {LoadingSubmitButtonComponent} from './components/loading-submit-button/loading-submit-button.component';
import {AuthorizedGuard} from 'app/shared/guards/authorized.guard';
import {UnauthorizedGuard} from 'app/shared/guards/unauthorized.guard';
import {ThankYouComponent} from './pages/thank-you/thank-you.component';
import {ForbiddenUsernameValidatorDirective} from './shared/directives/forbidden-username.directive';
import {ResetPasswordVerifyComponent} from './pages/reset-password-verify/reset-password-verify.component';
import {AboutComponent} from './pages/about/about.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  {
    path: '',
    component: MainContainerComponent,
    children: [
      {
        path: '',
        redirectTo: '/welcome',
        pathMatch: 'full'
      },
      {
        path: 'welcome',
        component: WelcomeComponent,
        canActivate: [UnauthorizedGuard]
      },
      {path: 'about', component: AboutComponent},
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
  }
];

@NgModule({
  declarations: [
    HeadingComponent,
    LoadingSubmitButtonComponent,
    HeaderComponent,
    FooterComponent,
    CardFooterComponent,
    LoginComponent,
    LogoutComponent,
    AboutComponent,
    SignupComponent,
    WelcomeComponent,
    ResetPasswordRequestComponent,
    ResetPasswordVerifyComponent,
    MainContainerComponent,
    ThankYouComponent,
    ForbiddenUsernameValidatorDirective,
  ],
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    CommonModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [MainContainerComponent]
})
export class MainModule {
}
