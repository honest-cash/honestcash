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
export class EditorCommentComponent implements OnInit {

  public EDITOR_EDITING_MODES = EDITOR_EDITING_MODES;

  constructor(
    private store: Store<AppStates>,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.store.dispatch(new EditorParentStoryLoad(params.parentStoryId));
    });
  }
}
