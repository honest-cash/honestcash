import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { WelcomeComponent } from './welcome.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    children: [
      { path: 'login', pathMatch: 'full', component: LoginComponent },
      { path: 'signup', pathMatch: 'full', component: SignupComponent }
    ]
  }
];

export default routes;
