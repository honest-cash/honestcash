import {Component, HostBinding, Inject, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {EDITOR_STATUS, State as EditorState} from '../../../../store/editor/editor.state';
import Story from '../../../../shared/models/story';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {EditorPublishModalComponent} from '../publish-modal/publish-modal.component';
import {WindowToken} from '../../../../core/helpers/window';
import {EnvironmentToken} from '../../../../core/helpers/environment';
import {Environment} from '../../../../../environments/environment';
import {ELEMENT_TYPES, ParagraphElement} from '../../shared/json-to-html';
import {EditorService} from '../../services/editor.service';
import {STORY_PROPERTIES} from '../../shared/editor.story-properties';
import {Logger} from '../../../../shared/services/logger.service';

const logger = new Logger();

@Component({
  selector: 'editor-publish-button',
  templateUrl: './publish-button.component.html',
  styleUrls: ['./publish-button.component.scss']
})
export class EditorPublishButtonComponent implements OnInit, OnDestroy {
  @HostBinding('class') public class = 'd-flex align-items-center';
  public saveStatus: EDITOR_STATUS;
  public shouldDisablePublish = true;
  public isBodyEmpty = true;
  public story: Story;
  public modalRef: NgbModalRef;
  private editor$: Observable<EditorState>;
  private editorSub: Subscription;

  constructor(
    @Inject(WindowToken) private window,
    @Inject(EnvironmentToken) private environment: Environment,
    private store: Store<AppStates>,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public editorService: EditorService,
  ) {
    this.editor$ = this.store.select(selectEditorState);
  }

  public ngOnInit() {
    this.editorSub = this.editor$.subscribe((editorState: EditorState) => {
      this.story = editorState.story;
      this.saveStatus = editorState.status;
      this.setIsBodyEmpty();
      this.setShouldDisablePublish();
    });
  }

  public onPublishClicked() {

    if (!this.story.title || (this.story.title && this.story.title === '')) {
      this.toastr.warning(`Write a title to publish it`, `No title!`, {positionClass: 'toast-bottom-right'});
      return;
    }

    if (this.isBodyEmpty) {
      this.toastr.warning(`Write something inside your story to publish it`, `Nothing written yet!`, {positionClass: 'toast-bottom-right'});
      return;
    }
    if (this.saveStatus === EDITOR_STATUS.NotSaved) {
      this.editorService.savePostProperty(this.story, STORY_PROPERTIES.BodyAndTitle).subscribe(this.openModal);
    } else {
      this.openModal();
    }
  }

  public openModal() {
    if (!this.shouldDisablePublish && (this.saveStatus === EDITOR_STATUS.EditorLoaded || this.saveStatus === EDITOR_STATUS.Saved)) {
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
  }

  public setShouldDisablePublish() {
    this.shouldDisablePublish = this.saveStatus === EDITOR_STATUS.Saving ||
      this.saveStatus === EDITOR_STATUS.Publishing ||
      this.saveStatus === EDITOR_STATUS.NotInitialized;
  }

  public setIsBodyEmpty() {
    this.isBodyEmpty = !this.story.bodyJSON ||
      (this.story.bodyJSON && this.story.bodyJSON.length === 0) ||
      (
        this.story.bodyJSON &&
        this.story.bodyJSON.length === 1 &&
        this.story.bodyJSON[0].type ===  ELEMENT_TYPES.Paragraph &&
        (
          (this.story.bodyJSON[0] as ParagraphElement).data.text === undefined ||
          (this.story.bodyJSON[0] as ParagraphElement).data.text === ''
        )
      );
  }

  public ngOnDestroy() {
    if (this.editorSub) {
      this.editorSub.unsubscribe();
    }
  }
}
