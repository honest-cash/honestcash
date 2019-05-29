import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import Post from '../../../../shared/models/post';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {EDITOR_STATUS, State as EditorState} from '../../../../store/editor/editor.state';
import {EditorStoryPropertyChange, EditorStorySaveAndPublish} from '../../../../store/editor/editor.actions';
import {EditorService, STORY_PROPERTIES} from '../../services/editor.service';
import Hashtag from '../../../../shared/models/hashtag';
import {ToastrService} from 'ngx-toastr';

export interface INgxChipsTag {
  hashtag: string;
}

@Component({
  selector: 'editor-publish-modal',
  templateUrl: './publish-modal.component.html',
  styleUrls: ['./publish-modal.component.scss'],
})
export class EditorPublishModalComponent implements OnInit, OnDestroy {
  public story: Post;
  public _hashtags: Hashtag[] | INgxChipsTag[] | string;
  public EDITOR_SAVE_STATUS = EDITOR_STATUS;
  public saveStatus: EDITOR_STATUS;
  private editorStateObservable: Observable<EditorState>;
  private editorState$: Subscription;

  constructor(
    private store: Store<AppStates>,
    public activeModal: NgbActiveModal,
    private editorService: EditorService,
    private toastr: ToastrService,
  ) {
    this.editorStateObservable = this.store.select(selectEditorState);
  }

  ngOnInit() {
    this.editorState$ = this.editorStateObservable
    .subscribe((editorState: EditorState) => {
      this.story = editorState.story;
      this.saveStatus = editorState.status;
      if (this.saveStatus === EDITOR_STATUS.Loaded) {
        if (!this._hashtags && this.story.userPostHashtags.length) {
          this._hashtags = this.story.userPostHashtags;
        }
      }

      if (this.saveStatus === EDITOR_STATUS.Published) {
        this.toastr.success(`Story Saved`, undefined, {positionClass: 'toast-bottom-right'});
        this.editorService.removeLocallySavedPost();
        this.activeModal.close();
      }
    });
  }

  onSubmit() {
    this.store.dispatch(new EditorStorySaveAndPublish(this.story));
  }

  onTitleChange(title: string) {
    this.store.dispatch(new EditorStoryPropertyChange({property: STORY_PROPERTIES.Title, value: title}));
  }

  onTagChange(tags: INgxChipsTag[]) {
    this.store.dispatch(new EditorStoryPropertyChange({property: STORY_PROPERTIES.Hashtags, value: tags}));
  }

  onChangeHasPaidSection() {
    this.store.dispatch(new EditorStoryPropertyChange({property: STORY_PROPERTIES.HasPaidSection, value: this.story.hasPaidSection}));
  }

  previewDraftStory() {
    this.editorService.savePostLocally(this.story);
    window.open('/editor/story-preview', '_blank');
  }

  onDismiss() {
    this.activeModal.dismiss();
  }

  ngOnDestroy() {
    this.editorState$.unsubscribe();
  }
}
