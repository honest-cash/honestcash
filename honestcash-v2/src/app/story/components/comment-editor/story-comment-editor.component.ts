import {Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import Story from '../../models/story';
import User from '../../../user/models/user';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState, selectStoryState, selectUserState} from '../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {UserState} from '../../../user/store/user.state';
import {ELEMENT_TYPES} from '../../../editor/shared/json-to-html';
import {EDITOR_STATUS, EditorState} from '../../../editor/store/editor.state';
import {
  EditorLoad,
  EditorStoryLoad,
  EditorStoryPropertyChange,
  EditorStorySaveAndPublish
} from '../../../editor/store/editor.actions';
import {EDITOR_STORY_PROPERTIES} from '../../../editor/shared/editor.story-properties';
import {StoryPropertySave} from '../../store/story.actions';
import {StoryState} from '../../store/story.state';
import {TRANSACTION_TYPES} from '../../../../core/shared/models/transaction';

@Component({
  selector: 'story-comment-editor',
  templateUrl: './story-comment-editor.component.html',
  styleUrls: ['./story-comment-editor.component.scss']
})
export class StoryCommentEditorComponent implements OnInit, OnDestroy {
  @Input() public parentStory: Story;
  @ViewChild('commentElement') public commentElement: ElementRef;
  @HostBinding('class') public class = 'col-12 mb-2 px-2';
  public user: User;
  public story: Story;
  public user$: Observable<UserState>;
  public userSub: Subscription;
  public editor$: Observable<EditorState>;
  public editorSub: Subscription;
  public story$: Observable<StoryState>;
  public storySub: Subscription;
  public commentButtonId = 'story-comment-button';
  public isSaving = false;
  constructor(
    private store: Store<AppStates>
  ) {
    this.user$ = this.store.select(selectUserState);
    this.editor$ = this.store.select(selectEditorState);
    this.story$ = this.store.select(selectStoryState);
  }

  public ngOnInit() {
    this.store.dispatch(new EditorStoryLoad({parentPostId: this.parentStory.id}));

    this.userSub = this.user$.subscribe((userState: UserState) => {
      this.user = userState.user;
    });
    this.editorSub = this.editor$.subscribe((editorState: EditorState) => {
      this.story = editorState.story;

      if (editorState.status === EDITOR_STATUS.StoryLoaded) {
        this.store.dispatch(new EditorLoad());
      }

      if (editorState.status === EDITOR_STATUS.EditorLoaded) {
        this.store.dispatch(
          new EditorStoryPropertyChange(
            {
              property: EDITOR_STORY_PROPERTIES.Title,
              value: `RE: ${this.parentStory.title}`
            }
          )
        );
      }

      if (editorState.status === EDITOR_STATUS.Published) {
        this.store.dispatch(
          new StoryPropertySave(
            {
              property: TRANSACTION_TYPES.Comment,
              data: this.story,
              transaction: {postId: this.story.id}
            }
          ));
        this.store.dispatch(new EditorStoryLoad({parentPostId: this.parentStory.id}));
        this.commentElement.nativeElement.innerHTML = '';
      }
    });

    this.storySub = this.story$.subscribe((storyState: StoryState) => {
      this.isSaving = storyState.isPropertySaving;
    });
  }

  public onCommentBlur($event: FocusEvent) {
    const button = $event.relatedTarget as HTMLButtonElement;
    if (button && button.id === this.commentButtonId) {
      $event.preventDefault();
    } else {
      this.commentElement.nativeElement.innerHTML = this.story.body;
    }
  }

  public onCommentChange($event: any) {
    // InputEvent interface is not yet introduced in Typescript
    // it is required to install a third party types file @types/dom-inputevent
    // hence the any type
    this.story.body = $event.target.innerText;
    this.store.dispatch(
      new EditorStoryPropertyChange(
        {
          property: EDITOR_STORY_PROPERTIES.Body,
          value: this.story.body,
        }
      )
    );
  }

  public onCommentClicked() {
    this.story.bodyJSON = this.converStoryBodyToJson();
    this.isSaving = true;
    this.store.dispatch(new EditorStorySaveAndPublish(this.story, [EDITOR_STORY_PROPERTIES.BodyAndTitle]));
  }

  public converStoryBodyToJson() {
    return (this.story.body as string).trim().split('\n').filter(comment => comment !== '' && comment !== '&nbsp;').map(comment => {
      return {
        type: ELEMENT_TYPES.Paragraph,
        data: {
          text: comment
        }
      };
    });
  }

  public ngOnDestroy() {
    if (this.storySub) {
      this.storySub.unsubscribe();
    }
    if (this.editorSub) {
      this.editorSub.unsubscribe();
    }
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

}
