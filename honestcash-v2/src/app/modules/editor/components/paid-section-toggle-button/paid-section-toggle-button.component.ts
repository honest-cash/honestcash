import {Component, OnInit} from '@angular/core';
import {EditorStoryPropertyChange} from '../../../../store/editor/editor.actions';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {State as EditorState} from '../../../../store/editor/editor.state';
import {Observable, Subscription} from 'rxjs';
import Post from '../../../../shared/models/post';
import {STORY_PROPERTIES} from '../../shared/editor.story-properties';

@Component({
  selector: 'editor-paid-section-toggle-button',
  templateUrl: './paid-section-toggle-button.component.html',
  styleUrls: ['./paid-section-toggle-button.component.scss']
})
export class EditorPaidSectionToggleButtonComponent implements OnInit {

  public story: Post;
  private editor$: Observable<EditorState>;
  private editorSub: Subscription;

  constructor(
    private store: Store<AppStates>,
  ) {
    this.editor$ = this.store.select(selectEditorState);
  }

  ngOnInit() {
    this.editorSub = this.editor$
    .subscribe((editorState: EditorState) => {
      this.story = editorState.story;
    });
  }

  onChangeHasPaidSection() {
    this.store.dispatch(new EditorStoryPropertyChange({property: STORY_PROPERTIES.HasPaidSection, value: this.story.hasPaidSection}));
  }

}
