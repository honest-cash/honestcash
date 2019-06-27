import {Component, OnDestroy, OnInit} from '@angular/core';
import Story from '../../../main/models/story';
import {EDITOR_EDITING_MODES} from '../header/header.component';
import {Observable, Subscription} from 'rxjs';
import {AppStates, selectEditorState} from '../../../app.states';
import {Store} from '@ngrx/store';
import {EditorState} from '../../store/editor.state';

@Component({
  selector: 'editor-parent-post-body',
  templateUrl: './parent-post-body.component.html',
  styleUrls: ['./parent-post-body.component.scss']
})
export class EditorParentPostBodyComponent implements OnInit, OnDestroy {

  public story: Story;
  public EDITOR_EDITING_MODES = EDITOR_EDITING_MODES;
  public isBodyOpen = false;
  private editor$: Observable<EditorState>;
  private editorSub: Subscription;

  constructor(
    private store: Store<AppStates>
  ) {
    this.editor$ = this.store.select(selectEditorState);
  }

  ngOnInit() {
    this.editorSub = this.editor$.subscribe((editorState: EditorState) => {
      this.story = editorState.story;
    });
  }

  toggleBody() {
    this.isBodyOpen = !this.isBodyOpen;
  }

  ngOnDestroy() {
    if (this.editorSub) {
      this.editorSub.unsubscribe();
    }
  }

}
