import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import Story from '../../../story/models/story';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {EditorStorySaveAndPublish} from '../../store/editor.actions';
import {EditorService} from '../../services/editor.service';
import {ToastrService} from 'ngx-toastr';
import {WindowToken} from '../../../../core/shared/helpers/window.helper';
import {isPlatformBrowser} from '@angular/common';
import {EDITOR_STORY_PROPERTIES} from '../../shared/editor.story-properties';
import {EDITOR_STATUS, EditorState} from '../../store/editor.state';

@Component({
  selector: 'editor-publish-modal',
  templateUrl: './publish-modal.component.html',
  styleUrls: ['./publish-modal.component.scss'],
})
export class EditorPublishModalComponent implements OnInit, OnDestroy {
  public story: Story;
  public EDITOR_SAVE_STATUS = EDITOR_STATUS;
  public saveStatus: EDITOR_STATUS;
  public isPlatformBrowser: boolean;
  private editor$: Observable<EditorState>;
  public editorSub: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    @Inject(WindowToken) private window,
    private store: Store<AppStates>,
    public activeModal: NgbActiveModal,
    private editorService: EditorService,
    private toastr: ToastrService,
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
    this.editor$ = this.store.select(selectEditorState);
  }

  public ngOnInit() {
    this.editorSub = this.editor$
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
        [EDITOR_STORY_PROPERTIES.BodyAndTitle, EDITOR_STORY_PROPERTIES.Hashtags, EDITOR_STORY_PROPERTIES.PaidSection]
      )
    );
  }

  public onClose() {
    this.activeModal.close();
  }

  public ngOnDestroy() {
    if (this.editorSub) {
      this.editorSub.unsubscribe();
    }
  }
}
