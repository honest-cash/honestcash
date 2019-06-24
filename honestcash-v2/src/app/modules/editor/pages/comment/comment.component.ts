import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../../app.states';
import {ActivatedRoute} from '@angular/router';
import {EDITOR_EDITING_MODES} from '../../components/header/header.component';
import {EditorStoryLoad} from '../../../../store/editor/editor.actions';

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

  public ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.store.dispatch(new EditorStoryLoad({parentPostId: params.parentStoryId}));
    });
  }
}
