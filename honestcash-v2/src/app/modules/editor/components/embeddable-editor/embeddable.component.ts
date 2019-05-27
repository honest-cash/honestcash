import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import Post from '../../../../shared/models/post';
import {EDITOR_SAVE_STATUS, State as EditorState} from '../../../../store/editor/editor.state';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {EditorStoryPublish, EditorStorySaveAndPublish} from '../../../../store/editor/editor.actions';
import {NgForm} from '@angular/forms';

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

  public saveStatus: EDITOR_SAVE_STATUS;
  readonly editor: EditorJS;
  private editorStateObservable: Observable<EditorState>;
  private editorState$: Subscription;
  private story: Post;

  constructor(
    private store: Store<AppStates>,
    private activeModal: NgbActiveModal,
  ) {
    this.editorStateObservable = this.store.select(selectEditorState);
  }

  ngOnInit() {
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

  onPublish(f: NgForm) {
    if (f.form.valid) {
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
