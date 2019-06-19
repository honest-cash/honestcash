import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {State as EditorState} from '../../../../store/editor/editor.state';
import {Observable, Subscription} from 'rxjs';
import {EDITOR_AUTO_SAVE} from '../../components/editor/editor.component';
import Post from '../../../../shared/models/post';
import {EditorDraftLoad} from '../../../../store/editor/editor.actions';
import {EDITOR_EDITING_MODES} from '../../components/header/header.component';

@Component({
  selector: 'editor-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class EditorWriteComponent implements OnInit {
  public EDITOR_EDITING_MODES = EDITOR_EDITING_MODES;

  constructor(
    private store: Store<AppStates>,
  ) {
    // explicitly turn autosave on write mode
    // so that on edit mode it is default by default even if forgotten
    EDITOR_AUTO_SAVE.ON = true;
  }

  ngOnInit() {
    this.store.dispatch(new EditorDraftLoad());
  }
}
