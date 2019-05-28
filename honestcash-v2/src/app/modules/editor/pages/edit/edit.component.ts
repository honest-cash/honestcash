import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {EDITOR_STATUS, State as EditorState} from '../../../../store/editor/editor.state';
import {Observable, Subscription} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Post from '../../../../shared/models/post';

@Component({
  selector: 'editor-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditorEditComponent implements OnInit, OnDestroy {
  public story: Post;
  private editorStateObservable: Observable<EditorState>;
  private editorState$: Subscription;

  constructor(
    private store: Store<AppStates>,
    private modalService: NgbModal,
  ) {
    this.editorStateObservable = this.store.select(selectEditorState);
  }

  ngOnInit() {
    this.editorState$ = this.editorStateObservable
    .subscribe((editorState: EditorState) => {
      this.story = editorState.story;
      if (editorState.status === EDITOR_STATUS.Published) {
        this.modalService.dismissAll();
      }
    });
  }

  ngOnDestroy() {
    this.editorState$.unsubscribe();
  }
}
