import { NgModule } from '@angular/core';
import { LoginComponent } from '@modules/welcome/pages/login/login.component';
import { SignupComponent } from '@modules/welcome/pages/signup/signup.component';
import { StatusComponent } from '@modules/welcome/pages/status/status.component';
import { ResetPasswordComponent } from '@modules/welcome/pages/reset-password/reset-password.component';
import { WelcomeComponent } from '@modules/welcome/pages/welcome/welcome.component';
import { WelcomeContainerComponent } from '@modules/welcome/welcome.component';
import { CommonModule } from '@angular/common';
import { AuthGuardService as AuthGuard } from '@services/auth-guard.service';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeadingComponent } from './components/heading/heading.component';
import { FormComponent } from './components/form/form.component';
import { FormFooterComponent } from './components/form/components/footer/footer.component';
import { FormLinkRightComponent } from './components/form/components/link-right/link-right.component';
import { ApplyTransparentInputClassDirective } from './directives/apply-transparent-input-class/apply-transparent-input-class.directive';
import { ApplyTransparentButtonClassDirective } from './directives/apply-transparent-button-class/apply-transparent-button-class.directive';

const routes: Routes = [
  {
    path: '',
    component: WelcomeContainerComponent,
    children: [
      { path: '', pathMatch: 'full', component: WelcomeComponent },
      { path: 'login', pathMatch: 'full', component: LoginComponent },
      { path: 'signup', pathMatch: 'full', component: SignupComponent },
      { path: 'reset-password', pathMatch: 'full', component: ResetPasswordComponent },
      { path: 'status', component: StatusComponent, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  declarations: [
    HeadingComponent,
    FormComponent,
    ApplyTransparentInputClassDirective,
    ApplyTransparentButtonClassDirective,
    HeaderComponent,
    FooterComponent,
    FormFooterComponent,
    FormLinkRightComponent,
    LoginComponent,
    SignupComponent,
    WelcomeComponent,
    ResetPasswordComponent,
    WelcomeContainerComponent,
    StatusComponent,
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
