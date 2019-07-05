import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, ElementRef, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';


import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';


import {isPlatformBrowser} from '@angular/common';
import {EDITOR_EDITING_MODES} from '../header/header.component';
import Story from '../../../story/models/story';
import {EditorStoryLoad, EditorStorySaveAndPublish} from '../../store/editor.actions';
import {AppStates, selectEditorState} from '../../../app.states';
import {EDITOR_STATUS, EditorState} from '../../store/editor.state';
import {EDITOR_STORY_PROPERTIES} from '../../shared/editor.story-properties';

type PaneType = 'first' | 'second';

@Component({
  selector: 'editor-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  animations: [
    trigger('slide', [
      state('first', style({transform: 'translateX(0)'})),
      state('second', style({transform: 'translateX(-50%)'})),
      transition('* => *', animate(300))
    ])
  ]
})
export class EditorPopupComponent implements OnInit, OnDestroy {
  @Input() public activePane: PaneType = 'first';
  @ViewChild('modalBody') public modalBody: ElementRef;
  public editingMode: EDITOR_EDITING_MODES;
  public hasLoaded = false;
  public EDITOR_EDITING_MODES = EDITOR_EDITING_MODES;
  public EDITOR_STATUS = EDITOR_STATUS;
  public saveStatus: EDITOR_STATUS;
  public story: Story;
  public isPlatformBrowser: boolean;
  private editor$: Observable<EditorState>;
  private editorSub: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private store: Store<AppStates>,
    public activeModal: NgbActiveModal,
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
    this.editor$ = this.store.select(selectEditorState);
  }

  public ngOnInit() {
    if (this.editingMode === EDITOR_EDITING_MODES.Write) {
      this.store.dispatch(new EditorStoryLoad());
    } else if (this.editingMode === EDITOR_EDITING_MODES.Edit) {
      this.store.dispatch(new EditorStoryLoad({postId: this.story.id}));
    }

    this.editorSub = this.editor$
      .subscribe((editorState: EditorState) => {
        this.saveStatus = editorState.status;
        this.story = editorState.story;

        if (this.saveStatus === EDITOR_STATUS.StoryLoaded) {
          this.hasLoaded = true;
        }

        if (this.saveStatus  === EDITOR_STATUS.Published) {
          this.activeModal.close(this.story);
        }
      });
  }

  public onBack() {
    this.activePane = 'first';
    this.modalBody.nativeElement.scrollTop = 0;
  }

  public onNext() {
    this.activePane = 'second';
    this.modalBody.nativeElement.scrollTop = 0;
  }

  public onSubmit() {
    this.store.dispatch(new EditorStorySaveAndPublish(this.story, [EDITOR_STORY_PROPERTIES.BodyAndTitle, EDITOR_STORY_PROPERTIES.Hashtags, EDITOR_STORY_PROPERTIES.PaidSection]));
  }

  public onDismiss() {
    this.activeModal.dismiss();
  }

  public ngOnDestroy() {
    if (this.editorSub) {
      this.editorSub.unsubscribe();
    }
  }

}
