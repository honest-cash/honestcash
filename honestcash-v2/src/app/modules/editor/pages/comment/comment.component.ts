import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {State as EditorState} from '../../../../store/editor/editor.state';
import {Observable, Subscription} from 'rxjs';
import Post from '../../../../shared/models/post';
import {ActivatedRoute} from '@angular/router';
import {EDITOR_EDITING_MODES} from '../../components/header/header.component';
import {EditorParentStoryLoad} from '../../../../store/editor/editor.actions';

@Component({
  selector: 'editor-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class EditorCommentComponent implements OnInit, OnDestroy {

  public EDITOR_EDITING_MODES = EDITOR_EDITING_MODES;
  public story: Post;
  private editor$: Observable<EditorState>;
  private editorSub: Subscription;

  constructor(
    private store: Store<AppStates>,
    private activatedRoute: ActivatedRoute,
  ) {
    this.editor$ = this.store.select(selectEditorState);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.store.dispatch(new EditorParentStoryLoad(params.parentStoryId));
    });

    this.editorSub = this.editor$
    .subscribe((editorState: EditorState) => {
      this.story = editorState.story;
    });
  }

  ngOnDestroy() {
    if (this.editorSub) {
      this.editorSub.unsubscribe();
    }
  }
}
