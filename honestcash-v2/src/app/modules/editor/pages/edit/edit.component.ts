import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {State as EditorState} from '../../../../store/editor/editor.state';
import {Observable, Subscription} from 'rxjs';
import Post from '../../../../shared/models/post';
import {EditorStoryLoad} from '../../../../store/editor/editor.actions';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'editor-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditorEditComponent implements OnInit, OnDestroy {
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
      this.store.dispatch(new EditorStoryLoad(params.storyId));
    });

    this.editorSub = this.editor$
    .subscribe((editorState: EditorState) => {
      this.story = editorState.story;
    });
  }

  ngOnDestroy() {
    this.editorSub.unsubscribe();
  }
}
