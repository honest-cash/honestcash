import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StatusComponent } from './pages/status/status.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { WelcomeContainerComponent } from './welcome.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeadingComponent } from './components/heading/heading.component';
import { FormComponent } from './components/form/form.component';
import { FormFooterComponent } from './components/form/components/footer/footer.component';
import { FormLinkRightComponent } from './components/form/components/link-right/link-right.component';
import { FatLoadingButtonComponent } from './components/fat-loading-button/fat-loading-button.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { AuthorizedGuard } from 'app/core/guards/authorized.guard';
import { UnauthorizedGuard } from 'app/core/guards/unauthorized.guard';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { ForbiddenUsernameValidatorDirective } from './directives/forbidden-username.directive';
import {ResetPasswordVerifyComponent} from './pages/reset-password-verify/reset-password-verify.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeContainerComponent,
    children: [
      { path: '', pathMatch: 'full', component: WelcomeComponent, canActivate: [UnauthorizedGuard] },
      { path: 'login', pathMatch: 'full', component: LoginComponent, canActivate: [UnauthorizedGuard] },
      { path: 'logout', pathMatch: 'full', component: LogoutComponent },
      { path: 'signup', pathMatch: 'full', component: SignupComponent, canActivate: [UnauthorizedGuard] },
      { path: 'reset-password', pathMatch: 'full', component: ResetPasswordComponent, canActivate: [UnauthorizedGuard] },
      { path: 'reset-password/verify', pathMatch: 'full', component: ResetPasswordVerifyComponent, canActivate: [UnauthorizedGuard] },
      { path: 'status', component: StatusComponent, canActivate: [AuthorizedGuard] },
      { path: 'thank-you', component: ThankYouComponent, canActivate: [AuthorizedGuard] },
    ]
  }
];

@NgModule({
  declarations: [
    TooltipDirective,
    HeadingComponent,
    FatLoadingButtonComponent,
    FormComponent,
    HeaderComponent,
    FooterComponent,
    FormFooterComponent,
    FormLinkRightComponent,
    LoginComponent,
    LogoutComponent,
    SignupComponent,
    WelcomeComponent,
    ResetPasswordComponent,
    ResetPasswordVerifyComponent,
    WelcomeContainerComponent,
    StatusComponent,
    ThankYouComponent,
    ForbiddenUsernameValidatorDirective,
  ],
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    CommonModule
  ],
  providers: [
  ],
  bootstrap: [WelcomeContainerComponent]
})
export class WelcomeModule { }
