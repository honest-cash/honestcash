import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {isPlatformBrowser} from '@angular/common';
import Hashtag from '../../../../shared/models/hashtag';
import {State as EditorState} from '../../../../store/editor/editor.state';
import {Observable, Subscription} from 'rxjs';
import {EditorStoryPropertyChange} from '../../../../store/editor/editor.actions';
import {STORY_PROPERTIES} from '../../shared/editor.story-properties';

export interface INgxChipsTag {
  hashtag: string;
}

@Component({
  selector: 'editor-story-tags-selection',
  templateUrl: './story-tags-selection.component.html',
  styleUrls: ['./story-tags-selection.component.scss']
})
export class EditorStoryTagsSelectionComponent implements OnInit {

  public isPlatformBrowser: boolean;
  public _hashtags: Hashtag[] | INgxChipsTag[] | string;
  private editor$: Observable<EditorState>;
  private editorSub: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private store: Store<AppStates>,
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
    this.editor$ = this.store.select(selectEditorState);
  }

  ngOnInit() {
    this.editorSub = this.editor$
    .subscribe((editorState: EditorState) => {
      if (!this._hashtags) {
        this._hashtags = editorState.story.userPostHashtags || [];
      }
    });
  }

  onTagChange(tags: INgxChipsTag[]) {
    this.store.dispatch(new EditorStoryPropertyChange({property: STORY_PROPERTIES.Hashtags, value: tags}));
  }

}
