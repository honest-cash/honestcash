import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {EDITOR_STATUS, State as EditorState} from '../../../../store/editor/editor.state';
import Post from '../../../../shared/models/post';
import {EditorStorySave} from '../../../../store/editor/editor.actions';
import EditorJS from '@editorjs/editorjs';

@Component({
  selector: 'editor-save-status',
  templateUrl: './save-status.component.html',
  styleUrls: ['./save-status.component.scss']
})
export class EditorSaveStatusComponent implements OnInit, OnDestroy {
  private editor: EditorJS;
  private EDITOR_SAVE_STATUS = EDITOR_STATUS;
  private editorStateObservable: Observable<EditorState>;
  private editorState$: Subscription;
  private story: Post;
  private saveStatus: EDITOR_STATUS;

  constructor(
    private store: Store<AppStates>,
  ) {
    this.editorStateObservable = this.store.select(selectEditorState);
  }

  ngOnInit() {
    this.editorState$ = this.editorStateObservable.subscribe((editorState: EditorState) => {
      this.saveStatus = editorState.status;
      this.story = editorState.story;
      this.editor = editorState.editor;
    });
  }

  saveDraftStory() {
    this.editor.saver.save()
    .then((outputData) => {
      this.story.body = outputData.blocks;
      this.store.dispatch(new EditorStorySave(this.story));
    });
  }

  ngOnDestroy() {
    this.editorState$.unsubscribe();
  }
}
