import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StatusComponent } from './pages/status/status.component';
import { ResetPasswordRequestComponent } from './pages/reset-password-request/reset-password-request.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { WelcomeContainerComponent } from './welcome.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeadingComponent } from './components/heading/heading.component';
import { CardFooterComponent } from './components/card/footer/footer.component';
import { LoadingSubmitButtonComponent } from './components/loading-submit-button/loading-submit-button.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { AuthorizedGuard } from 'app/core/guards/authorized.guard';
import { UnauthorizedGuard } from 'app/core/guards/unauthorized.guard';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { ForbiddenUsernameValidatorDirective } from './directives/forbidden-username.directive';
import {ResetPasswordVerifyComponent} from './pages/reset-password-verify/reset-password-verify.component';
import { AboutComponent } from './pages/about/about.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  {
    path: '',
    component: WelcomeContainerComponent,
    children: [
      { path: '', pathMatch: 'full', component: WelcomeComponent, canActivate: [UnauthorizedGuard] },
      { path: 'about', component: AboutComponent, canActivate: [UnauthorizedGuard] },
      { path: 'login', pathMatch: 'full', component: LoginComponent, canActivate: [UnauthorizedGuard] },
      { path: 'logout', pathMatch: 'full', component: LogoutComponent },
      { path: 'signup', pathMatch: 'full', component: SignupComponent, canActivate: [UnauthorizedGuard] },
      // tslint:disable-next-line:max-line-length
      { path: 'reset-password-request/:resetCode', pathMatch: 'full', component: ResetPasswordVerifyComponent, canActivate: [UnauthorizedGuard] },
      { path: 'reset-password-request', pathMatch: 'full', component: ResetPasswordRequestComponent, canActivate: [UnauthorizedGuard] },
      { path: 'status', component: StatusComponent, canActivate: [AuthorizedGuard] },
      { path: 'thank-you', component: ThankYouComponent, canActivate: [AuthorizedGuard] },
    ]
  }
];

@NgModule({
  declarations: [
    TooltipDirective,
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
    WelcomeContainerComponent,
    StatusComponent,
    ThankYouComponent,
    ForbiddenUsernameValidatorDirective,
  ],
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    CommonModule,
    FontAwesomeModule
  ],
  providers: [
  ],
  bootstrap: [WelcomeContainerComponent]
})
export class WelcomeModule { }
