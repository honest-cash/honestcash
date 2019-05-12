import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * - More specific routes should come first
 * - Every module here is lazy-loaded
 */
const routes: Routes = [
  /**
  {
    path: 'editor',
    loadChildren: './modules/editor/editor.module#EditorModule'
  },
  */
  {
    path: '',
    loadChildren: './modules/welcome/welcome.module#WelcomeModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
