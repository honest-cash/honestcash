import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, ElementRef, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import Post from '../../../../shared/models/post';
import {EDITOR_STATUS, State as EditorState} from '../../../../store/editor/editor.state';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {EditorStoryLocalLoad, EditorStoryPropertyChange, EditorStorySaveAndPublish} from '../../../../store/editor/editor.actions';
import {STORY_PROPERTIES} from '../../services/editor.service';
import {isPlatformBrowser} from '@angular/common';

type PaneType = 'first' | 'second';

@Component({
  selector: 'editor-embeddable',
  templateUrl: './embeddable.component.html',
  styleUrls: ['./embeddable.component.scss'],
  animations: [
    trigger('slide', [
      state('first', style({transform: 'translateX(0)'})),
      state('second', style({transform: 'translateX(-50%)'})),
      transition('* => *', animate(300))
    ])
  ]
})
export class EditorEmbeddableComponent implements OnInit, OnDestroy {
  @Input() activePane: PaneType = 'first';
  @ViewChild('modalBody') modalBody: ElementRef;
  public saveStatus: EDITOR_STATUS;
  public story: Post;
  public isPlatformBrowser: boolean;
  private editorStateObservable: Observable<EditorState>;
  private editorState$: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private store: Store<AppStates>,
    public activeModal: NgbActiveModal,
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
    this.editorStateObservable = this.store.select(selectEditorState);
  }

  ngOnInit() {
    this.store.dispatch(new EditorStoryLocalLoad());
    this.editorState$ = this.editorStateObservable
    .subscribe((editorState: EditorState) => {
      this.saveStatus = editorState.status;
      this.story = editorState.story;
    });
  }

  onBack() {
    this.activePane = 'first';
    this.modalBody.nativeElement.scrollTop = 0;
  }

  onNext() {
    this.activePane = 'second';
    this.modalBody.nativeElement.scrollTop = 0;
  }

  onChangeHasPaidSection() {
    this.store.dispatch(new EditorStoryPropertyChange({property: STORY_PROPERTIES.HasPaidSection, value: this.story.hasPaidSection}));
  }

  onSubmit() {
    this.store.dispatch(new EditorStorySaveAndPublish(this.story));
  }

  onDismiss() {
    this.activeModal.dismiss();
  }

  ngOnDestroy() {
    if (this.editorState$) {
      this.editorState$.unsubscribe();
    }
  }

}
