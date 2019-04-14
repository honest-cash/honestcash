import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/welcome/welcome.module#WelcomeModule'
  }, {
    path: 'wallet',
    loadChildren: './modules/wallet/wallet.module#WalletModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
