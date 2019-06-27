import {NgModule} from '@angular/core';
import {AuthWelcomeComponent} from '../auth/pages/welcome/welcome.component';
import {WalletContainerComponent} from './wallet-container.component';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {UnauthorizedGuard} from 'core/shared/guards/unauthorized.guard';
import {SharedModule} from '../../core/shared.module';

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
  declarations: [
    WalletContainerComponent,
  ],
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [WalletContainerComponent]
})
export class WalletModule {
}
