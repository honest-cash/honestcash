import {Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import Story from '../../models/story';
import User from '../../../user/models/user';
import {Store} from '@ngrx/store';
import {AppStates, selectStoryState, selectUserState} from '../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {UserState} from '../../../user/store/user.state';
import {ELEMENT_TYPES} from '../../../editor/shared/json-to-html';
import {StoryCommentDraftBodyChange, StoryCommentDraftLoad, StoryPropertySave} from '../../store/story.actions';
import {StoryState} from '../../store/story.state';
import {TRANSACTION_TYPES} from '../../../../core/shared/models/transaction';

@Component({
  selector: 'story-comment-editor',
  templateUrl: './story-comment-editor.component.html',
  styleUrls: ['./story-comment-editor.component.scss']
})
export class StoryCommentEditorComponent implements OnInit, OnDestroy {
  @Input() public shouldScrollToEditor = false;
  @Input() public commentParent: Story;
  @ViewChild('commentElement') public commentElement: ElementRef;
  @ViewChild('commentWrapperElement') public commentWrapperElement: ElementRef;
  @HostBinding('class') public class = 'col-12 mb-2';
  public user: User;
  public comment: Story;
  public commentDraft: Story;
  public masterStory: Story;
  public user$: Observable<UserState>;
  public userSub: Subscription;
  public story$: Observable<StoryState>;
  public storySub: Subscription;
  public commentButtonId = 'story-comment-button';
  public isSaving = false;
  constructor(
    private store: Store<AppStates>
  ) {
    this.user$ = this.store.select(selectUserState);
    this.story$ = this.store.select(selectStoryState);

  }

  public ngOnInit() {
    this.userSub = this.user$.subscribe((userState: UserState) => {
      this.user = userState.user;
    });
    this.storySub = this.story$.subscribe((storyState: StoryState) => {
      this.masterStory = storyState.story;
      this.commentDraft = storyState.commentDraft;

      if (storyState.hasCommentDraftLoaded) {
        this.commentDraft.title = `RE: ${this.commentDraft.parentPost.title}`;
      }

        if (this.isSaving && !storyState.isPropertySaving) {
          this.isSaving = false;
          this.commentElement.nativeElement.innerHTML = '';
        }

    });

    if (this.commentParent && !this.commentDraft) {
      this.store.dispatch(new StoryCommentDraftLoad(this.commentParent.id));
    }
  }

  public onCommentBlur($event: FocusEvent) {
    const button = $event.relatedTarget as HTMLButtonElement;
    if (button && button.id === this.commentButtonId) {
      $event.preventDefault();
    } else if (this.commentDraft) {
      this.commentElement.nativeElement.innerHTML = this.commentDraft.body;
    }
  }

  public onCommentChange($event: any) {
    // InputEvent interface is not yet introduced in Typescript
    // it is required to install a third party types file @types/dom-inputevent
    // hence the any type
    this.store.dispatch(new StoryCommentDraftBodyChange($event.target.innerText));
  }

  public onCommentClicked() {
    this.commentDraft.bodyJSON = this.converStoryBodyToJson();
    this.isSaving = true;
    this.store.dispatch(new StoryPropertySave(
      {
        property: TRANSACTION_TYPES.Comment,
        transaction: {postId: this.masterStory.id},
        data: this.commentDraft
      }
    ));
  }

  public converStoryBodyToJson() {
    return (this.commentDraft.body as string)
      .trim()
      .split('\n')
      .filter(comment => comment !== '' && comment !== '&nbsp;')
      .map(comment => {
        return {
          type: ELEMENT_TYPES.Paragraph,
          data: {
            text: comment
          }
        };
      }
    );
  }

  public ngOnDestroy() {
    if (this.storySub) {
      this.storySub.unsubscribe();
    }
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

}
