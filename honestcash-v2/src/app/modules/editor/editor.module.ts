import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditorContainerComponent} from './editor-container.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {AuthorizedGuard} from '../../shared/guards/authorized.guard';
import {TagInputModule} from 'ngx-chips';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {EditorStoryPreviewComponent} from './pages/story-preview/story-preview.component';
import {EditorWriteComponent} from './pages/write/write.component';
import {EditorEditComponent} from './pages/edit/edit.component';
import {EditorModalExampleComponent} from './pages/modal-example/modal-example.component';
import {EditorPublishModalComponent} from './components/publish-modal/publish-modal.component';
import {EditorPublishButtonComponent} from './components/publish-button/publish-button.component';
import {EditorHeaderComponent} from './components/header/header.component';
import {EditorEmbeddableComponent} from './components/embeddable-editor/embeddable.component';
import {EditorPaidSectionSelectionComponent} from './components/paid-section-selection/paid-section-selection.component';
import {EditorSaveStatusComponent} from './components/save-status/save-status.component';
import {EditorComponent} from './components/editor/editor.component';

const routes: Routes = [
  {
    path: '',
    component: EditorContainerComponent,
    children: [
      {path: 'write', pathMatch: 'full', component: EditorWriteComponent, canActivate: [AuthorizedGuard]},
      {path: 'edit', pathMatch: 'full', component: EditorEditComponent, canActivate: [AuthorizedGuard]},
      {path: 'story-preview', pathMatch: 'full', component: EditorStoryPreviewComponent, canActivate: [AuthorizedGuard]},
      {path: 'modal-example', pathMatch: 'full', component: EditorModalExampleComponent},
    ]
  }
];

@NgModule({
  declarations: [
    EditorComponent,
    HeaderComponent,
    EditorPublishModalComponent,
    EditorPublishButtonComponent,
    EditorSaveStatusComponent,
    EditorContainerComponent,
    EditorWriteComponent,
    EditorEditComponent,
    EditorModalExampleComponent,
    EditorStoryPreviewComponent,
    EditorHeaderComponent,
    EditorStoryPreviewComponent,
    EditorEmbeddableComponent,
    EditorPaidSectionSelectionComponent,
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
  ],
  providers: [],
  bootstrap: [EditorContainerComponent]
})
export class EditorModule {
}
