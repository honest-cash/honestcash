import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainContainerComponent} from './main-container.component';
import {MainAboutComponent} from './pages/about/about.component';

/**
 * - More specific routes should come first
 */
const routes: Routes = [
  {
    path: '',
    component: MainContainerComponent,
    children: [
      {path: 'about', component: MainAboutComponent},
      {
        path: '',
        redirectTo: '/welcome',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
