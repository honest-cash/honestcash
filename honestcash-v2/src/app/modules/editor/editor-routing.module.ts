import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorWrapperComponent } from './editor-wrapper.component';
import { EditorCoreComponent } from './editor-core/editor-core.component';

const routes: Routes = [
  {
    path: '',
    component: EditorWrapperComponent,
    children: [
      {
        path: '',
        component: EditorCoreComponent
      },
      {
        path: 'response/:parentPostId',
        pathMatch: 'full',
        component: EditorCoreComponent,
      },
      {
        path: 'edit/:postId',
        pathMatch: 'full',
        component: EditorCoreComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EditorRoutingModule {}
