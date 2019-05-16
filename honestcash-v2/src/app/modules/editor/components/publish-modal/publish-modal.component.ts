import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import Post from '../../../../core/models/post';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {State as EditorState} from '../../../../core/store/editor/editor.state';
import {EditorChange, EditorPropertyChange} from '../../../../core/store/editor/editor.actions';
import {STORY_PROPERTIES} from '../../services/editor.service';
import Hashtag from '../../../../core/models/hashtag';

export interface INgxChipsTag {
  hashtag: string;
}

@Component({
  selector: 'app-editor-publish-modal',
  templateUrl: './publish-modal.component.html',
  styleUrls: ['./publish-modal.component.scss'],
})
export class PublishModalComponent implements OnInit, OnDestroy {
  @Output() publishClick = new EventEmitter<void>();
  private editorStateObservable: Observable<EditorState>;
  private editorState$: Subscription;
  private story: Post;
  private isPublishing = false;
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
        if (editorState.isLoaded) {
          this.story = editorState.story;
          if (!this._hashtags) {
            this._hashtags = this.story.userPostHashtags;
          }
        }
      });
  }

  onSubmit() {
    this.isPublishing = true;
    this.publishClick.emit();
  }

  onTitleChange(title: string) {
    this.store.dispatch(new EditorPropertyChange({property: STORY_PROPERTIES.Title, value: title}));
  }

  onTagChange(tags: INgxChipsTag[]) {
    this.store.dispatch(new EditorPropertyChange({property: STORY_PROPERTIES.Hashtags, value: tags}));
  }

  onDismiss() {
    this.activeModal.dismiss();
  }

  ngOnDestroy() {
    this.editorState$.unsubscribe();
  }
}
