import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserContainerComponent} from './user-container.component';

/**
 * - More specific routes should come first
 */
const routes: Routes = [
  {
    path: '',
    component: UserContainerComponent,
    /*children: [
      /!*{
        path: 'profile',
        component: AuthWelcomeComponent,
        canActivate: [UnauthorizedGuard]
      },*!/
    ]*/
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
