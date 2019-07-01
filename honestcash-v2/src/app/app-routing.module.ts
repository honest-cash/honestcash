import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedNotFoundComponent} from '../core/shared/pages/not-found/not-found.component';
import {AppComponent} from './app.component';

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
    // :username also counts for /anyRoute/:id meaning /story/id is possible and /post/id is possible
    // @todo write UrlMatcher to only include story and post prefixes
    path: ':username/:storyIdOrAlias',
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
