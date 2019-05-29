import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {State as EditorState} from '../../../../store/editor/editor.state';
import {Observable, Subscription} from 'rxjs';
import {EDITOR_AUTO_SAVE} from '../../components/editor/editor.component';
import Post from '../../../../shared/models/post';
import {EditorDraftLoad} from '../../../../store/editor/editor.actions';

@Component({
  selector: 'editor-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class EditorWriteComponent implements OnInit, OnDestroy {
  public story: Post;
  private editorStateObservable: Observable<EditorState>;
  private editorState$: Subscription;

  constructor(
    private store: Store<AppStates>,
  ) {
    this.editorStateObservable = this.store.select(selectEditorState);
    // explicitly turn autosave on write mode
    // so that on edit mode it is default by default even if forgotten
    EDITOR_AUTO_SAVE.ON = true;
  }

  ngOnInit() {
    this.store.dispatch(new EditorDraftLoad());
    this.editorState$ = this.editorStateObservable
    .subscribe((editorState: EditorState) => {
      this.story = editorState.story;
    });
  }

  ngOnDestroy() {
    this.editorState$.unsubscribe();
  }
}
