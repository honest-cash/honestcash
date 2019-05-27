import {Component, ElementRef, HostBinding, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {convertBlockToHtml} from '../../converters/json-to-html';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {State as EditorState} from '../../../../store/editor/editor.state';
import Post from '../../../../shared/models/post';

@Component({
  selector: 'editor-story-preview',
  templateUrl: './story-preview.component.html',
  styleUrls: ['./story-preview.component.scss']
})
export class EditorStoryPreviewComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'mb-auto mt-auto';
  @ViewChildren('body') body: QueryList<ElementRef>;
  private editorStateObservable: Observable<EditorState>;
  private editorState$: Subscription;
  private story: Post;
  private convertBlockToHtml = convertBlockToHtml;

  constructor(
    private store: Store<AppStates>
  ) {
    this.editorStateObservable = this.store.select(selectEditorState);
  }

  ngOnInit() {
    this.editorState$ = this.editorStateObservable.subscribe((editorState: EditorState) => {
      this.story = editorState.story;
    });
  }

  ngOnDestroy() {
    this.editorState$.unsubscribe();
  }
}
