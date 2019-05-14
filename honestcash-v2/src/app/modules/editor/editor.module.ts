import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import {RouterModule, Routes} from '@angular/router';
import {EditorContainerComponent} from './container/editor-container.component';
import {HeaderComponent} from './header/header.component';
import {AvatarComponent} from '../../shared/components/avatar/avatar.component';
import {StoryComponent} from './story/story.component';
import {FontAwesomeModule} from '../../core/modules/font-awesome.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EmbeddableEditorComponent} from './embed/embed.component';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: EditorContainerComponent,
    children: [
      { path: 'write', pathMatch: 'full', component: EditorComponent },
      { path: 'story', pathMatch: 'full', component: StoryComponent },
    ]
  }
];

@NgModule({
  declarations: [
    HeaderComponent,
    EditorContainerComponent,
    EditorComponent,
    AvatarComponent,
    StoryComponent,
    EmbeddableEditorComponent,
  ],
  entryComponents: [
    EmbeddableEditorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FontAwesomeModule,
    NgbModule,
  ],
  providers: [
  ],
  bootstrap: [EditorComponent]
})
export class EditorModule { }
