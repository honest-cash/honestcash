import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import Story from '../../models/story';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Observable, Subscription} from 'rxjs';
import {StoryState} from '../../store/story.state';
import {Store} from '@ngrx/store';
import {AppStates, selectStoryState} from '../../../app.states';
import {StoryCommentDraftLoad} from '../../store/story.actions';
import {TRANSACTION_TYPES} from '../../../../core/shared/models/transaction';

@Component({
  selector: 'story-comments',
  templateUrl: './story-comments.component.html',
  styleUrls: ['./story-comments.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(600 )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])
  ]
})
export class StoryCommentsComponent implements OnInit, OnDestroy {
  @ViewChild('editorContainerElement') public editor: ElementRef;
  public comments: Story[];
  public masterStory: Story;
  public story$: Observable<StoryState>;
  public storySub: Subscription;
  public shouldShowCommentEditor = false;
  public shouldShowCommentEditorPlaceholder = true;
  public commentParent: Story;
  public commentDraft: Story;
  public isLoading = true;
  constructor(
    private store: Store<AppStates>,
  ) {
    this.story$ = this.store.select(selectStoryState);
  }

  public ngOnInit() {
    this.storySub = this.story$.subscribe((storyState: StoryState) => {
      this.masterStory = storyState.story;
      this.comments = storyState.comments;
      this.commentParent = storyState.commentParent;
      this.commentDraft = storyState.commentDraft;

      if (this.comments) {
        this.isLoading = false;
      }

      if (storyState.hasCommentDraftLoaded) {
        if (this.commentDraft.parentPostId === this.masterStory.id) {
          this.shouldShowCommentEditorPlaceholder = false;
          this.shouldShowCommentEditor = true;
        } else {
          this.shouldShowCommentEditorPlaceholder = true;
          this.shouldShowCommentEditor = false;
        }
      }
    });
  }

  public onCommentClicked() {
    this.store.dispatch(new StoryCommentDraftLoad(this.masterStory.id));
  }

  public ngOnDestroy() {
    if (this.storySub) {
      this.storySub.unsubscribe();
    }
  }
}
