import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { WelcomeComponent } from './welcome.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import routes from './welcome.routes';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    WelcomeComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  providers: [],
  bootstrap: [WelcomeComponent]
})
export class WelcomeModule { }
