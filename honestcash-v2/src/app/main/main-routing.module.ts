import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainContainerComponent} from './main-container.component';
import {MainAboutComponent} from './pages/about/about.component';
import {MainTermsOfServiceComponent} from './pages/terms-of-service/terms-of-service.component';
import {MainPrivacyPolicyComponent} from './pages/privacy-policy/privacy-policy.component';
import {MainFaqComponent} from './pages/faq/faq.component';
import {MainTransparencyComponent} from './pages/transparency/transparency.component';
import {MainAboutHonestCashComponent} from './pages/about-honest-cash/about-honest-cash.component';

/**
 * - More specific routes should come first
 */
const routes: Routes = [
  {
    path: '',
    component: MainContainerComponent,
    children: [
      {path: 'about', component: MainAboutComponent},
      {path: 'about-honest-cash', component: MainAboutHonestCashComponent},
      {path: 'terms-of-service', component: MainTermsOfServiceComponent},
      {path: 'privacy-policy', component: MainPrivacyPolicyComponent},
      {path: 'transparency', component: MainTransparencyComponent},
      {path: 'help', component: MainFaqComponent},
      {path: 'faq', component: MainFaqComponent},
      {path: 'frequently-asked-questions', component: MainFaqComponent},
      {
        path: '',
        redirectTo: '/welcome',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
