import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {EDITOR_SAVE_STATUS, State as EditorState} from '../../../../store/editor/editor.state';
import Post from '../../../../shared/models/post';
import {EditorStoryPublish, EditorStorySaveAndPublish} from '../../../../store/editor/editor.actions';
import EditorJS from '@editorjs/editorjs';

@Component({
  selector: 'editor-publish-button',
  templateUrl: './publish-button.component.html',
  styleUrls: ['./publish-button.component.scss']
})
export class EditorPublishButtonComponent implements OnInit, OnDestroy {
  private editor: EditorJS;
  private EDITOR_SAVE_STATUS = EDITOR_SAVE_STATUS;
  private editorStateObservable: Observable<EditorState>;
  private editorState$: Subscription;
  private saveStatus: EDITOR_SAVE_STATUS;
  private story: Post;

  constructor(
    private store: Store<AppStates>,
  ) {
    this.editorStateObservable = this.store.select(selectEditorState);
  }

  ngOnInit() {
    this.editorState$ = this.editorStateObservable.subscribe((editorState: EditorState) => {
      this.story = editorState.story;
      this.saveStatus = editorState.status;
      this.editor = editorState.editor;
    });
  }

  onSubmit() {
    if (this.saveStatus === EDITOR_SAVE_STATUS.NotSaved) {
      this.editor.saver.save()
      .then((outputData) => {
        this.story.body = outputData.blocks;
        this.store.dispatch(new EditorStorySaveAndPublish(this.story));
      });
    } else {
      this.store.dispatch(new EditorStoryPublish(this.story));
    }
  }

  ngOnDestroy() {
    if (this.editorState$) {
      this.editorState$.unsubscribe();
    }
  }
}
