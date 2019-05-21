import {NgModule} from '@angular/core';
import {EditorNewComponent} from './pages/new/editor-new.component';
import {RouterModule, Routes} from '@angular/router';
import {EditorContainerComponent} from './editor-container.component';
import {StoryComponent} from './story/story.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EmbeddableEditorComponent} from './embed/embed.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {NewHeaderComponent} from './pages/new/components/write-header/new-header.component';
import {AuthorizedGuard} from '../../core/guards/authorized.guard';
import {PublishModalComponent} from './components/publish-modal/publish-modal.component';
import {TagInputModule} from 'ngx-chips';
import {PaidSectionSelectionComponent} from './components/paid-section-selection/paid-section-selection.component';

const routes: Routes = [
  {
    path: '',
    component: EditorContainerComponent,
    children: [
      {path: 'write', pathMatch: 'full', component: EditorNewComponent, canActivate: [AuthorizedGuard]},
      {path: 'story', pathMatch: 'full', component: StoryComponent},
    ]
  }
];

@NgModule({
  declarations: [
    PublishModalComponent,
    EditorContainerComponent,
    EditorNewComponent,
    NewHeaderComponent,
    StoryComponent,
    EmbeddableEditorComponent,
    PaidSectionSelectionComponent,
  ],
  entryComponents: [
    PublishModalComponent,
    EmbeddableEditorComponent,
  ],
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    SharedModule,
    TagInputModule,
  ],
  providers: [],
  bootstrap: [EditorNewComponent]
})
export class EditorModule {
}
