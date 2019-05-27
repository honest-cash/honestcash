import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {EDITOR_SAVE_STATUS, State as EditorState} from '../../../../store/editor/editor.state';
import {Observable, Subscription} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditorPublishModalComponent} from '../../components/publish-modal/publish-modal.component';

@Component({
  selector: 'editor-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class EditorWriteComponent implements OnInit, OnDestroy {
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
      if (editorState.status === EDITOR_SAVE_STATUS.Published) {
        this.modalService.dismissAll();
      }
    });
  }

  publishStory() {
    this.modalService.open(EditorPublishModalComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });
  }

  ngOnDestroy() {
    this.editorState$.unsubscribe();
  }
}
