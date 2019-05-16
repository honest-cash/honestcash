import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import Post from '../../../../core/models/post';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {State as EditorState} from '../../../../core/store/editor/editor.state';
import {EditorChange} from '../../../../core/store/editor/editor.actions';

@Component({
  selector: 'app-editor-publish-modal',
  templateUrl: './publish-modal.component.html',
  styleUrls: ['./publish-modal.component.scss'],
})
export class PublishModalComponent implements OnInit, OnDestroy {
  @Output() onPublishClick = new EventEmitter<void>();
  private editorStateObservable: Observable<EditorState>;
  private editorState$: Subscription;
  private story: Post;
  private isPublishing = false;
  constructor(
    private store: Store<AppStates>,
    public activeModal: NgbActiveModal,
  ) {
    this.editorStateObservable = this.store.select(selectEditorState);
  }

  ngOnInit() {
    this.editorState$ = this.editorStateObservable
      .subscribe((editorState: EditorState) => {
        if (editorState.isLoaded) {
          this.story = editorState.story;
        }
      });
  }

  onSubmit(form) {
    console.log('form', form);
  }

  onPublish() {
    this.isPublishing = true;
    this.onPublishClick.emit();
  }

  onDismiss() {
    this.activeModal.dismiss();
  }

  ngOnDestroy() {
    this.editorState$.unsubscribe();
  }
}
