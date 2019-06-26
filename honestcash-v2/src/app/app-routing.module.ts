import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

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
    loadChildren: './modules/main/main.module#MainModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
