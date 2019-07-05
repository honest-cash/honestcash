import {NgModule} from '@angular/core';
import {EditorContainerComponent} from './editor-container.component';
import {FormsModule} from '@angular/forms';
import {TagInputModule} from 'ngx-chips';
import {EditorWriteComponent} from './pages/write/write.component';
import {EditorEditComponent} from './pages/edit/edit.component';
import {EditorPublishModalComponent} from './components/publish-modal/publish-modal.component';
import {EditorPublishButtonComponent} from './components/publish-button/publish-button.component';
import {EditorHeaderComponent} from './components/header/header.component';
import {EditorPaidSectionSelectionComponent} from './components/paid-section-selection/paid-section-selection.component';
import {EditorSaveStatusComponent} from './components/save-status/save-status.component';
import {EditorComponent} from './components/editor/editor.component';
import {EditorCommentButtonComponent} from './components/comment-button/comment-button.component';
import {ScriptLoaderModule} from 'ngx-script-loader';
import {EditorStoryTagsSelectionComponent} from './components/story-tags-selection/story-tags-selection.component';
import {EditorPaidSectionToggleButtonComponent} from './components/paid-section-toggle-button/paid-section-toggle-button.component';
import {EditorCommentComponent} from './pages/comment/comment.component';
import {EditorParentPostBodyComponent} from './components/parent-post-body/parent-post-body.component';
import {EditorRoutingModule} from './editor-routing.module';
import {EffectsModule} from '@ngrx/effects';
import {EditorEffects} from './store/editor.effects';
import {EditorSharedModule} from './editor-shared.module';
import {LayoutModule} from '../../core/layout.module';
import {UserSharedModule} from '../user/user-shared.module';

@NgModule({
  declarations: [
    EditorComponent,
    EditorHeaderComponent,
    EditorPublishModalComponent,
    EditorPublishButtonComponent,
    EditorStoryTagsSelectionComponent,
    EditorCommentButtonComponent,
    EditorSaveStatusComponent,
    EditorContainerComponent,
    EditorWriteComponent,
    EditorEditComponent,
    EditorCommentComponent,
    EditorHeaderComponent,
    EditorPaidSectionSelectionComponent,
    EditorPaidSectionToggleButtonComponent,
    EditorParentPostBodyComponent,
  ],
  entryComponents: [
    EditorComponent,
    EditorPublishModalComponent,
    EditorPublishButtonComponent,
    EditorSaveStatusComponent,
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
