import {Component, ElementRef, HostBinding, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {convertBlockToHtml} from '../../converters/json-to-html';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {State as EditorState} from '../../../../core/store/editor/editor.state';
import Post from '../../../../core/models/post';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditorEmbeddableComponent} from '../../components/embeddable-editor/embeddable.component';

@Component({
  selector: 'editor-modal-example',
  templateUrl: './modal-example.component.html',
  styleUrls: ['./modal-example.component.scss']
})
export class EditorModalExampleComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'mb-auto mt-auto';
  @ViewChildren('body') body: QueryList<ElementRef>;
  private editorStateObservable: Observable<EditorState>;
  private editorState$: Subscription;
  private story: Post;
  private convertBlockToHtml = convertBlockToHtml;

  constructor(
    private store: Store<AppStates>,
    private modalService: NgbModal
  ) {
    this.editorStateObservable = this.store.select(selectEditorState);
  }

  ngOnInit() {
    this.editorState$ = this.editorStateObservable.subscribe((editorState: EditorState) => {
      this.story = editorState.story;
    });
  }

  openEditorModal() {
    const modalRef = this.modalService.open(EditorEmbeddableComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });
  }

  ngOnDestroy() {
    this.editorState$.unsubscribe();
  }
}
