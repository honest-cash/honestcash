import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditorContainerComponent} from './editor-container.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {AuthorizedGuard} from '../../shared/guards/authorized.guard';
import {TagInputModule} from 'ngx-chips';
import {EditorStoryPreviewComponent} from './pages/story-preview/story-preview.component';
import {EditorWriteComponent} from './pages/write/write.component';
import {EditorEditComponent} from './pages/edit/edit.component';
import {EditorPublishModalComponent} from './components/publish-modal/publish-modal.component';
import {EditorPublishButtonComponent} from './components/publish-button/publish-button.component';
import {EditorHeaderComponent} from './components/header/header.component';
import {EditorEmbeddableComponent} from './components/embeddable-editor/embeddable.component';
import {EditorPaidSectionSelectionComponent} from './components/paid-section-selection/paid-section-selection.component';
import {EditorSaveStatusComponent} from './components/save-status/save-status.component';
import {EditorComponent} from './components/editor/editor.component';
import {EditorPaidSectionUnlockerComponent} from './components/paid-section-unlocker/paid-section-unlocker.component';
import {EditorEditButtonComponent} from './components/comment-button/comment-button.component';
import {ScriptLoaderModule} from 'ngx-script-loader';
import {EditorLoadingIndicatorComponent} from './components/loading-indicator/loading-indicator.component';
import {EditorStoryTagsSelectionComponent} from './components/story-tags-selection/story-tags-selection.component';
import {EditorPaidSectionToggleButtonComponent} from './components/paid-section-toggle-button/paid-section-toggle-button.component';
import {EditorCommentComponent} from './pages/comment/comment.component';
import {EditorMigrationComponent} from './pages/editor-migration/migration.component';
import {EditorParentPostBodyComponent} from './components/parent-post-body/parent-post-body.component';

const routes: Routes = [
  {
    path: '',
    component: EditorContainerComponent,
    children: [
      {path: 'write', component: EditorWriteComponent, canActivate: [AuthorizedGuard]},
      {path: 'edit/:storyId', component: EditorEditComponent, canActivate: [AuthorizedGuard]},
      {path: 'comment/:parentStoryId', component: EditorCommentComponent, canActivate: [AuthorizedGuard]},
      {
        path: 'story-preview',
        component: EditorStoryPreviewComponent,
        canActivate: [AuthorizedGuard]
      },
      {
        path: 'migration/:storyId',
        component: EditorMigrationComponent,
        canActivate: [AuthorizedGuard]
      },
    ]
  }
];

@NgModule({
  declarations: [
    EditorComponent,
    EditorHeaderComponent,
    EditorPublishModalComponent,
    EditorPublishButtonComponent,
    EditorStoryTagsSelectionComponent,
    EditorEditButtonComponent,
    EditorSaveStatusComponent,
    EditorContainerComponent,
    EditorWriteComponent,
    EditorEditComponent,
    EditorCommentComponent,
    EditorStoryPreviewComponent,
    EditorHeaderComponent,
    EditorStoryPreviewComponent,
    EditorEmbeddableComponent,
    EditorPaidSectionSelectionComponent,
    EditorPaidSectionUnlockerComponent,
    EditorLoadingIndicatorComponent,
    EditorPaidSectionToggleButtonComponent,
    EditorMigrationComponent,
    EditorParentPostBodyComponent,
  ],
  entryComponents: [
    EditorComponent,
    EditorPublishModalComponent,
    EditorPublishButtonComponent,
    EditorSaveStatusComponent,
    EditorEmbeddableComponent
  ],
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    SharedModule,
    TagInputModule,
    ScriptLoaderModule,
  ],
  providers: [],
  bootstrap: [EditorContainerComponent]
})
export class EditorModule {
}
