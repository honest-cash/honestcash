import {NgModule} from '@angular/core';
import {EditorContainerComponent} from './editor-container.component';
import {FormsModule} from '@angular/forms';
import {TagInputModule} from 'ngx-chips';
import {EditorWriteComponent} from './pages/write/write.component';
import {EditorEditComponent} from './pages/edit/edit.component';
import {EditorPublishButtonComponent} from './components/publish-button/publish-button.component';
import {EditorHeaderComponent} from './components/header/header.component';
import {EditorSaveStatusComponent} from './components/save-status/save-status.component';
import {EditorCommentButtonComponent} from './components/comment-button/comment-button.component';
import {ScriptLoaderModule} from 'ngx-script-loader';
import {EditorCommentComponent} from './pages/comment/comment.component';
import {EditorParentPostBodyComponent} from './components/parent-post-body/parent-post-body.component';
import {EditorRoutingModule} from './editor-routing.module';
import {EditorSharedModule} from './editor-shared.module';
import {LayoutModule} from '../../core/layout.module';
import {UserSharedModule} from '../user/user-shared.module';

@NgModule({
  declarations: [
    EditorHeaderComponent,
    EditorCommentButtonComponent,
    EditorContainerComponent,
    EditorWriteComponent,
    EditorEditComponent,
    EditorCommentComponent,
    EditorHeaderComponent,
    EditorParentPostBodyComponent,
  ],
  imports: [
    FormsModule,
    EditorRoutingModule,
    EditorSharedModule,
    UserSharedModule,
    LayoutModule,
    TagInputModule,
    ScriptLoaderModule,
  ],
  bootstrap: [EditorContainerComponent]
})
export class EditorModule {
}
