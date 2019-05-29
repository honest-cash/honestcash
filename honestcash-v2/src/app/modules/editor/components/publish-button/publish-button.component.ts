import {Component, HostBinding, Inject, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {EDITOR_STATUS, State as EditorState} from '../../../../store/editor/editor.state';
import Post from '../../../../shared/models/post';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {EditorEffects} from '../../../../store/editor/editor.effects';
import {EditorPublishModalComponent} from '../publish-modal/publish-modal.component';
import {WindowToken} from '../../../../core/helpers/window';
import {EnvironmentToken} from '../../../../core/helpers/environment';
import {Environment} from '../../../../../environments/environment';

@Component({
  selector: 'editor-publish-button',
  templateUrl: './publish-button.component.html',
  styleUrls: ['./publish-button.component.scss']
})
export class EditorPublishButtonComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'd-flex align-items-center';
  private EDITOR_SAVE_STATUS = EDITOR_STATUS;
  private editorStateObservable: Observable<EditorState>;
  private editorState$: Subscription;
  private saveStatus: EDITOR_STATUS;
  private story: Post;
  private modalRef: NgbModalRef;

  constructor(
    @Inject(WindowToken) private window,
    @Inject(EnvironmentToken) private environment: Environment,
    private store: Store<AppStates>,
    private editorEffects: EditorEffects,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) {
    this.editorStateObservable = this.store.select(selectEditorState);
  }

  ngOnInit() {
    this.editorState$ = this.editorStateObservable.subscribe((editorState: EditorState) => {
      this.story = editorState.story;
      this.saveStatus = editorState.status;
    });
  }

  openPublishModal() {
    if (this.story.bodyJSON && this.story.bodyJSON.length === 0) {
      this.toastr.warning(`Write your story to publish it`, `Nothing written yet!`, {positionClass: 'toast-bottom-right'});
      return;
    }
    if (this.saveStatus === EDITOR_STATUS.NotSaved) {
      this.toastr.warning(`Save your story first!`, undefined, {positionClass: 'toast-bottom-right'});
    }

    if (this.saveStatus === EDITOR_STATUS.Initialized || this.saveStatus === EDITOR_STATUS.Saved) {
      this.openModal();
    }

  }

  openModal() {
    this.modalRef = this.modalService.open(EditorPublishModalComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });
    this.modalRef.result.then((result) => {
      if (this.saveStatus === EDITOR_STATUS.Published) {
        this.window.location.href = `${this.environment.clientUrl}${this.story.user.username}/${this.story.alias}`;
      }
    });
  }

  ngOnDestroy() {
    if (this.editorState$) {
      this.editorState$.unsubscribe();
    }
  }
}
