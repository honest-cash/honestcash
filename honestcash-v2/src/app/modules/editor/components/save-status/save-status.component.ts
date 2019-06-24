import {Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {interval, Observable, Subscription} from 'rxjs';
import {EDITOR_STATUS, State as EditorState} from '../../../../store/editor/editor.state';
import Post from '../../../../shared/models/post';
import {EditorStoryPropertySave} from '../../../../store/editor/editor.actions';
import {EDITOR_AUTO_SAVE_INTERVAL} from '../editor/editor.component';
import {takeWhile} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {EDITOR_EDITING_MODES} from '../header/header.component';
import {STORY_PROPERTIES} from '../../shared/editor.story-properties';

@Component({
  selector: 'editor-save-status',
  templateUrl: './save-status.component.html',
  styleUrls: ['./save-status.component.scss']
})
export class EditorSaveStatusComponent implements OnInit, OnDestroy {
  @HostBinding('class') public class = 'd-flex align-items-center';
  @Input() public editingMode: EDITOR_EDITING_MODES;
  @Input() public isAutosaveEnabled: boolean;
  public EDITOR_SAVE_STATUS = EDITOR_STATUS;
  public story: Post;
  public saveStatus: EDITOR_STATUS;
  public isSaveButtonClicked = false;
  private editor$: Observable<EditorState>;
  private editorSub: Subscription;
  private autoSave$: Observable<number>;
  private autoSaveSub: Subscription;

  constructor(
    private store: Store<AppStates>,
    private toastr: ToastrService,
  ) {
    this.editor$ = this.store.select(selectEditorState);
  }

  public ngOnInit() {
    this.editorSub = this.editor$.subscribe((editorState: EditorState) => {
      this.saveStatus = editorState.status;
      this.story = editorState.story;

      /*
        disable autosave for comments
       */
      if (this.isAutosaveEnabled) {
        // reset interval
        this.autoSave$ = interval(EDITOR_AUTO_SAVE_INTERVAL);
        if (this.saveStatus === EDITOR_STATUS.Saved) {
          // reset button clicked status
          this.isSaveButtonClicked = false;
        } else {
          // otherwise subscribe while status is not saved this dispatches an action that saves the body
          // thus the above if part resets the interval
          // if user keeps constantly writing and the status remains NotSaved for the set amount of interval in seconds
          // it will dispatch the action to save and repeat
          // if user saves prematurely while the interval is somehow half way through
          // we should cancel the previous action (or rather not fire at all with takeWhile)
          // hence the saveClicked check
          this.autoSaveSub = this.autoSave$.pipe(
            takeWhile(() => this.saveStatus === EDITOR_STATUS.NotSaved && !this.isSaveButtonClicked),
          ).subscribe(() => this.dispatchStoryPropertySave());
        }
      }
    });

  }

  public onSaveClick() {
    if (this.editingMode !== EDITOR_EDITING_MODES.Comment && (!this.story.title || (this.story.title && this.story.title.length === 0))) {
      this.toastr.warning(`The story needs a title to be saved`, `No title!`, {positionClass: 'toast-bottom-right'});
      return;
    }
    if (this.story.bodyJSON && this.story.bodyJSON.length === 0) {
      this.toastr.warning(`Write your story to save it`, `Nothing written yet!`, {positionClass: 'toast-bottom-right'});
      return;
    }
    this.isSaveButtonClicked = true;
    this.dispatchStoryPropertySave();
  }

  public dispatchStoryPropertySave() {
    if (
      this.saveStatus === EDITOR_STATUS.NotSaved &&
      this.story.bodyJSON && this.story.bodyJSON.length !== 0 &&
      (this.editingMode === EDITOR_EDITING_MODES.Comment || (this.story.title && this.story.title.length !== 0))
    ) {
      this.store.dispatch(new EditorStoryPropertySave({story: this.story, property: STORY_PROPERTIES.BodyAndTitle}));
    }
  }

  public ngOnDestroy() {
    if (this.editorSub) {
      this.editorSub.unsubscribe();
    }
    if (this.autoSaveSub) {
      this.autoSaveSub.unsubscribe();
    }
  }
}
