import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {EDITOR_STATUS, State as EditorState} from '../../../../store/editor/editor.state';
import {Observable, Subscription} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EDITOR_AUTO_SAVE} from '../../components/editor/editor.component';
import Post from '../../../../shared/models/post';
import {EditorService} from '../../services/editor.service';

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
    private modalService: NgbModal,
    private editorService: EditorService,
  ) {
    this.editorStateObservable = this.store.select(selectEditorState);
    // explicitly turn autosave on write mode
    // so that on edit mode it is default by default even if forgotten
    EDITOR_AUTO_SAVE.ON = true;
  }

  ngOnInit() {
    this.editorState$ = this.editorStateObservable
    .subscribe((editorState: EditorState) => {
      this.story = editorState.story;
      this.story = this.editorService.setBlankBody(this.story);
      if (editorState.status === EDITOR_STATUS.Published) {
        this.modalService.dismissAll();
      }
    });
  }

  ngOnDestroy() {
    this.editorState$.unsubscribe();
  }
}
