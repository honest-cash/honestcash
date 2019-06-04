import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {environment} from '../environments/environment';

/**
 * - More specific routes should come first
 * - Every module here is lazy-loaded
 */
const routes: Routes = [
  {
    path: 'editor',
    loadChildren: './modules/editor/editor.module#EditorModule'
  },
  {
    path: '',
    loadChildren: './modules/welcome/welcome.module#WelcomeModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: !environment.production})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
