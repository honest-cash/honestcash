import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WalletContainerComponent} from './wallet-container.component';

/**
 * - More specific routes should come first
 */
const routes: Routes = [
  {
    path: '',
    component: WalletContainerComponent,
    /*    children: [
          /!*{
            path: '',
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
export class WalletRoutingModule {
}
