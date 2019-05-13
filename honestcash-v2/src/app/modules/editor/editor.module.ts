import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import {RouterModule, Routes} from '@angular/router';
import {EditorContainerComponent} from './container/editor-container.component';
import {HeaderComponent} from './header/header.component';

const routes: Routes = [
  {
    path: '',
    component: EditorContainerComponent,
    children: [
      { path: 'write', pathMatch: 'full', component: EditorComponent },
    ]
  }
];

@NgModule({
  declarations: [
    HeaderComponent,
    EditorContainerComponent,
    EditorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
  ],
  bootstrap: [EditorComponent]
})
export class EditorModule { }
