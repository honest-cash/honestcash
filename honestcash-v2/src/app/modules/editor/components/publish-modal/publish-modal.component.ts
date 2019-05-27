import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import Post from '../../../../shared/models/post';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {EDITOR_SAVE_STATUS, State as EditorState} from '../../../../store/editor/editor.state';
import {EditorStoryPropertyChange, EditorStoryPublish, EditorStorySaveAndPublish} from '../../../../store/editor/editor.actions';
import {STORY_PROPERTIES} from '../../services/editor.service';
import Hashtag from '../../../../shared/models/hashtag';
import EditorJS from '@editorjs/editorjs';

export interface INgxChipsTag {
  hashtag: string;
}

@Component({
  selector: 'editor-publish-modal',
  templateUrl: './publish-modal.component.html',
  styleUrls: ['./publish-modal.component.scss'],
})
export class EditorPublishModalComponent implements OnInit, OnDestroy {
  private editor: EditorJS;
  private EDITOR_SAVE_STATUS = EDITOR_SAVE_STATUS;
  private editorStateObservable: Observable<EditorState>;
  private editorState$: Subscription;
  private saveStatus: EDITOR_SAVE_STATUS;
  private story: Post;
  private _hashtags: Hashtag[] | INgxChipsTag[] | string;

  constructor(
    private store: Store<AppStates>,
    public activeModal: NgbActiveModal,
  ) {
    this.editorStateObservable = this.store.select(selectEditorState);
  }

  ngOnInit() {
    this.editorState$ = this.editorStateObservable
    .subscribe((editorState: EditorState) => {
      this.story = editorState.story;
      if (editorState.isLoaded) {
        this.saveStatus = editorState.status;
        this.editor = editorState.editor;
        if (!this._hashtags && this.story.userPostHashtags.length) {
          this._hashtags = this.story.userPostHashtags;
        }
      }
    });
  }

  onSubmit() {
    if (this.saveStatus === EDITOR_SAVE_STATUS.NotSaved) {
      this.editor.saver.save()
      .then((outputData) => {
        this.story.body = outputData.blocks;
        this.store.dispatch(new EditorStorySaveAndPublish(this.story));
      });
    } else {
      this.store.dispatch(new EditorStoryPublish(this.story));
    }
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

  onDismiss() {
    this.activeModal.dismiss();
  }

  ngOnDestroy() {
    this.editorState$.unsubscribe();
  }
}
