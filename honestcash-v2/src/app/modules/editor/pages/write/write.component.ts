import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../../app.states';
import {EditorStoryLoad} from '../../../../store/editor/editor.actions';
import {EDITOR_EDITING_MODES} from '../../components/header/header.component';

@Component({
  selector: 'editor-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class EditorWriteComponent implements OnInit {
  public editingMode = EDITOR_EDITING_MODES.Write;
  public isAutosaveEnabled = true;

  constructor(
    private store: Store<AppStates>,
  ) {
  }

  public ngOnInit() {
    this.store.dispatch(new EditorStoryLoad());
  }
}
