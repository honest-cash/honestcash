import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditorContainerComponent} from './editor-container.component';
import {EditorWriteComponent} from './pages/write/write.component';
import {AuthorizedGuard} from '../../core/shared/guards/authorized.guard';
import {EditorEditComponent} from './pages/edit/edit.component';
import {EditorCommentComponent} from './pages/comment/comment.component';

/**
 * - More specific routes should come first
 */
const routes: Routes = [
  {
    path: '',
    component: EditorContainerComponent,
    children: [
      {path: 'comment/:parentStoryId', component: EditorCommentComponent, canActivate: [AuthorizedGuard]},
      {path: 'edit/:storyId', component: EditorEditComponent, canActivate: [AuthorizedGuard]},
      {path: 'write', component: EditorWriteComponent, canActivate: [AuthorizedGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule {
}
