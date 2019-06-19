import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {State as EditorState} from '../../../../store/editor/editor.state';
import {Observable, Subscription} from 'rxjs';
import {EditorStoryLoad} from '../../../../store/editor/editor.actions';
import {ActivatedRoute} from '@angular/router';
import {EDITOR_EDITING_MODES} from '../../components/header/header.component';

@Component({
  selector: 'editor-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditorEditComponent implements OnInit {
  public EDITOR_EDITING_MODES = EDITOR_EDITING_MODES;

  constructor(
    private store: Store<AppStates>,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.store.dispatch(new EditorStoryLoad(params.storyId));
    });
  }
}
