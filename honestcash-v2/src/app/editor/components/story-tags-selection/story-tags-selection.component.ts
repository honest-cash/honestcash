import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../app.states';
import {isPlatformBrowser} from '@angular/common';
import Hashtag from '../../models/hashtag';
import {Observable, Subscription} from 'rxjs';
import {EditorStoryPropertyChange} from '../../store/editor.actions';
import {EDITOR_STORY_PROPERTIES} from '../../shared/editor.story-properties';
import {EditorState} from '../../store/editor.state';

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
  public userPostHashtagsKey = 'hashtag';
  private editor$: Observable<EditorState>;
  private editorSub: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private store: Store<AppStates>,
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
    this.editor$ = this.store.select(selectEditorState);
  }

  public ngOnInit() {
    this.editorSub = this.editor$
    .subscribe((editorState: EditorState) => {
      if (!this._hashtags) {
        this._hashtags = editorState.story.userPostHashtags || [];
      }
    });
  }

  public onTagChange(tags: INgxChipsTag[]) {
    this.store.dispatch(new EditorStoryPropertyChange({property: EDITOR_STORY_PROPERTIES.Hashtags, value: tags}));
  }

}
