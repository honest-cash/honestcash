import { NgModule } from '@angular/core';
import { LoginComponent } from '@modules/welcome/pages/login/login.component';
import { SignupComponent } from '@modules/welcome/pages/signup/signup.component';
import { StatusComponent } from '@modules/welcome/pages/status/status.component';
import { WelcomeComponent } from '@modules/welcome/pages/welcome/welcome.component';
import { WelcomeContainerComponent } from '@modules/welcome/welcome.component';
import { CommonModule } from '@angular/common';
import { AuthGuardService as AuthGuard } from '@services/auth-guard.service';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    children: [
      { path: 'login', pathMatch: 'full', component: LoginComponent },
      { path: 'signup', pathMatch: 'full', component: SignupComponent },
      { path: 'status', component: StatusComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    WelcomeComponent,
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
