import {Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import Story from '../../models/story';
import {AppStates, selectStoryState} from '../../../app.states';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {StoryState} from '../../store/story.state';

@Component({
  selector: 'story-comment-card',
  templateUrl: './story-comment-card.component.html',
  styleUrls: ['./story-comment-card.component.scss'],
})
export class StoryCommentCardComponent implements OnInit, OnDestroy {
  @Input() public comment: Story;
  @HostBinding('class') public class = 'col-12 mb-2';
  public commentParent: Story;
  public commentDraft: Story;
  public story$: Observable<StoryState>;
  public storySub: Subscription;
  public shouldShowEditor = false;
  constructor(
    private store: Store<AppStates>,
  ) {
    this.story$ = this.store.select(selectStoryState);
  }

  public ngOnInit() {
    this.storySub = this.story$.subscribe((storyState: StoryState) => {
      this.commentParent = storyState.commentParent;
      this.commentDraft = storyState.commentDraft;

      if (this.commentDraft && this.comment && this.commentDraft.parentPostId === this.comment.id) {
        this.shouldShowEditor = true;
      }
    });
  }


  public ngOnDestroy() {
    if (this.storySub) {
      this.storySub.unsubscribe();
    }
  }
}
