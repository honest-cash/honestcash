import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../app.states';
import {EditorStoryLoad} from '../../store/editor/editor.actions';
import {ActivatedRoute} from '@angular/router';
import {EDITOR_EDITING_MODES} from '../../components/header/header.component';

@Component({
  selector: 'editor-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditorEditComponent implements OnInit {
  public editingMode = EDITOR_EDITING_MODES.Edit;

  constructor(
    private store: Store<AppStates>,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  public ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.store.dispatch(new EditorStoryLoad({postId: params.storyId}));
    });
  }
}
