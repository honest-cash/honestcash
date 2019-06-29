import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedNotFoundComponent} from '../core/shared/pages/not-found/not-found.component';

/**
 * - More specific routes should come first
 * - Every module here is lazy-loaded
 */
const routes: Routes = [
  {
    path: 'editor',
    loadChildren: './editor/editor.module#EditorModule'
  },
  {
    path: 'wallet',
    loadChildren: './wallet/wallet.module#WalletModule'
  },
  {
    path: '',
    loadChildren: './story/story.module#StoryModule'
  },
  {
    path: '',
    loadChildren: './main/main.module#MainModule'
  },
  {
    path: '',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {path: 'not-found', component: SharedNotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
