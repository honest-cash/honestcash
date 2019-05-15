import { NgModule } from '@angular/core';
import { EditorWriteComponent } from './pages/new/editor-write.component';
import {RouterModule, Routes} from '@angular/router';
import {EditorContainerComponent} from './editor-container.component';
import {StoryComponent} from './story/story.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EmbeddableEditorComponent} from './embed/embed.component';
import {FormsModule} from '@angular/forms';
import {EditorEditComponent} from './pages/edit/editor-edit.component';
import {SharedModule} from '../../shared/shared.module';
import {WriteHeaderComponent} from './pages/new/components/write-header/write-header.component';
import {EditHeaderComponent} from './pages/edit/components/edit-header/edit-header.component';

const routes: Routes = [
  {
    path: '',
    component: EditorContainerComponent,
    children: [
      { path: 'write', pathMatch: 'full', component: EditorWriteComponent },
      { path: 'edit/:id', pathMatch: 'full', component: EditorEditComponent },
      { path: 'story', pathMatch: 'full', component: StoryComponent },
    ]
  }
];

@NgModule({
  declarations: [
    EditorContainerComponent,
    EditorWriteComponent,
    WriteHeaderComponent,
    EditorEditComponent,
    EditHeaderComponent,
    StoryComponent,
    EmbeddableEditorComponent,
  ],
  entryComponents: [
    EmbeddableEditorComponent,
  ],
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    SharedModule,
  ],
  providers: [
  ],
  bootstrap: [EditorWriteComponent]
})
export class EditorModule { }
