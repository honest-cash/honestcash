import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StatusComponent } from './pages/status/status.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { WelcomeContainerComponent } from './welcome.component';
import { CommonModule } from '@angular/common';
import { AuthGuardService as AuthGuard } from '../../services/auth-guard.service';
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
    TooltipDirective,
    HeadingComponent,
    FatLoadingButtonComponent,
    FormComponent,
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
