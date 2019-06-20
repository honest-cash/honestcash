import {Component, HostBinding, Inject, OnDestroy, OnInit} from '@angular/core';
import {EDITOR_STATUS, State as EditorState} from '../../../../store/editor/editor.state';
import {AppStates, selectEditorState} from '../../../../app.states';
import {Store} from '@ngrx/store';
import Post from '../../../../shared/models/post';
import {ToastrService} from 'ngx-toastr';
import {Observable, Subscription} from 'rxjs';
import {EditorCommentSaveAndPublish} from '../../../../store/editor/editor.actions';
import {WindowToken} from '../../../../core/helpers/window';
import {EnvironmentToken} from '../../../../core/helpers/environment';
import {Environment} from '../../../../../environments/environment';
import {ELEMENT_TYPES, ParagraphElement} from '../../converters/json-to-html';

@Component({
  selector: 'editor-comment-button',
  templateUrl: './comment-button.component.html',
  styleUrls: ['./comment-button.component.scss']
})
export class EditorCommentButtonComponent implements OnInit, OnDestroy {
  @HostBinding('class') public class = 'd-flex align-items-center mr-4';
  public story: Post;
  public EDITOR_SAVE_STATUS = EDITOR_STATUS;
  public saveStatus: EDITOR_STATUS;
  private editor$: Observable<EditorState>;
  private editorSub: Subscription;

  constructor(
    @Inject(WindowToken) private window,
    @Inject(EnvironmentToken) private environment: Environment,
    private store: Store<AppStates>,
    private toastr: ToastrService,
  ) {
    this.editor$ = this.store.select(selectEditorState);
  }

  ngOnInit() {
    this.editorSub = this.editor$.subscribe((editorState: EditorState) => {
      this.story = editorState.story;
      this.saveStatus = editorState.status;

      if (this.saveStatus === EDITOR_STATUS.Published) {
        this.window.location.href = `${this.environment.clientUrl}${this.story.user.username}/${this.story.alias}`;
      }
    });
  }

  onCommentClicked() {
    if (this.story.bodyJSON && this.story.bodyJSON.length === 0) {
      this.toastr.warning(`Write your comment to publish it`, `Nothing written yet!`, {positionClass: 'toast-bottom-right'});
      return;
    }
    if (
      this.story.bodyJSON &&
      this.story.bodyJSON.length === 1 &&
      this.story.bodyJSON[0].type ===  ELEMENT_TYPES.Paragraph &&
      (this.story.bodyJSON[0] as ParagraphElement).data.text !== undefined &&
      (this.story.bodyJSON[0] as ParagraphElement).data.text === '') {
      this.toastr.warning(`Write something inside your comment to publish it`, `Nothing written yet!`, {positionClass: 'toast-bottom-right'});
      return;
    }
    if (this.saveStatus === EDITOR_STATUS.Initialized || this.saveStatus === EDITOR_STATUS.Saved || this.saveStatus === EDITOR_STATUS.NotSaved) {
      this.store.dispatch(new EditorCommentSaveAndPublish(this.story));
    }
  }

  ngOnDestroy() {
    if (this.editorSub) {
      this.editorSub.unsubscribe();
    }
  }
}
