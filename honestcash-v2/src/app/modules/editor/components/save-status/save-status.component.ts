import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {interval, Observable, Subscription} from 'rxjs';
import {EDITOR_STATUS, State as EditorState} from '../../../../store/editor/editor.state';
import Post from '../../../../shared/models/post';
import {EditorStoryPropertySave} from '../../../../store/editor/editor.actions';
import {STORY_PROPERTIES} from '../../services/editor.service';
import {EDITOR_AUTO_SAVE} from '../editor/editor.component';
import {takeWhile} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'editor-save-status',
  templateUrl: './save-status.component.html',
  styleUrls: ['./save-status.component.scss']
})
export class EditorSaveStatusComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'd-flex align-items-center';
  private EDITOR_SAVE_STATUS = EDITOR_STATUS;
  private editorStateObservable: Observable<EditorState>;
  private editorState$: Subscription;
  private story: Post;
  private saveStatus: EDITOR_STATUS;
  private autosaveIntervalObservable = interval(EDITOR_AUTO_SAVE.INTERVAL);
  private autoSaveInterval$: Subscription;

  constructor(
    private store: Store<AppStates>,
    private toastr: ToastrService,
  ) {
    this.editorStateObservable = this.store.select(selectEditorState);
  }

  ngOnInit() {
    this.editorState$ = this.editorStateObservable.subscribe((editorState: EditorState) => {
      this.saveStatus = editorState.status;
      this.story = editorState.story;

      if (EDITOR_AUTO_SAVE.ON) {
        this.autoSaveInterval$ = this.autosaveIntervalObservable.pipe(
          takeWhile(() => this.saveStatus === EDITOR_STATUS.NotSaved),
        ).subscribe(() => this.dispatchStoryPropertySave());
      }
    });

  }

  onSaveClick() {
    if (this.story.bodyJSON && this.story.bodyJSON.length === 0) {
      this.toastr.warning(`Write your story to publish it`, `Nothing written yet!`, {positionClass: 'toast-bottom-right'});
      return;
    }
    this.dispatchStoryPropertySave();
  }

  dispatchStoryPropertySave() {
    if (this.saveStatus === EDITOR_STATUS.NotSaved && this.story.bodyJSON && this.story.bodyJSON.length !== 0) {
      this.store.dispatch(new EditorStoryPropertySave({story: this.story, property: STORY_PROPERTIES.BodyJSON}));
    }
  }

  ngOnDestroy() {
    this.editorState$.unsubscribe();
    this.autoSaveInterval$.unsubscribe();
  }
}
