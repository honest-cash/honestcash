import { NgModule } from '@angular/core';
import { LandingComponent } from './pages/landing/landing.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';

const routes: Routes = [{
    path: '',
    component: WelcomeComponent,
    children: [
      { path: 'login', pathMatch: 'full', component: LandingComponent },
      { path: 'signup', pathMatch: 'full', component: LandingComponent }
    ]
  }
];

@NgModule({
  declarations: [
    LandingComponent,
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
