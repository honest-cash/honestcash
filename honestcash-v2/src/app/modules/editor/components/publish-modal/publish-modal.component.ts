import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import Post from '../../../../shared/models/post';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {EDITOR_STATUS, State as EditorState} from '../../../../store/editor/editor.state';
import {EditorStorySaveAndPublish} from '../../../../store/editor/editor.actions';
import {EditorService} from '../../services/editor.service';
import {ToastrService} from 'ngx-toastr';
import {WindowToken} from '../../../../core/helpers/window';
import {isPlatformBrowser} from '@angular/common';
import {STORY_PROPERTIES} from '../../shared/editor.story-properties';

@Component({
  selector: 'editor-publish-modal',
  templateUrl: './publish-modal.component.html',
  styleUrls: ['./publish-modal.component.scss'],
})
export class EditorPublishModalComponent implements OnInit, OnDestroy {
  public story: Post;
  public EDITOR_SAVE_STATUS = EDITOR_STATUS;
  public saveStatus: EDITOR_STATUS;
  public isPlatformBrowser: boolean;
  private editorStateObservable: Observable<EditorState>;
  private editorState$: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    @Inject(WindowToken) private window,
    private store: Store<AppStates>,
    public activeModal: NgbActiveModal,
    private editorService: EditorService,
    private toastr: ToastrService,
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
    this.editorStateObservable = this.store.select(selectEditorState);
  }

  public ngOnInit() {
    this.editorState$ = this.editorStateObservable
    .subscribe((editorState: EditorState) => {
      this.story = editorState.story;
      this.saveStatus = editorState.status;

      if (this.saveStatus === EDITOR_STATUS.Published) {
        this.toastr.success(`Story Saved`, undefined, {positionClass: 'toast-bottom-right'});
        this.onClose();
      }
    });
  }

  public onSubmit() {
    this.store.dispatch(
      new EditorStorySaveAndPublish(
        this.story,
        [STORY_PROPERTIES.BodyAndTitle, STORY_PROPERTIES.Hashtags, STORY_PROPERTIES.PaidSection]
      )
    );
  }

  public previewDraftStory() {
    this.window.open('/editor/story-preview', '_blank');
  }

  public onClose() {
    this.activeModal.close();
  }

  public ngOnDestroy() {
    if (this.editorState$) {
      this.editorState$.unsubscribe();
    }
  }
}
