import {Component, OnDestroy, OnInit} from '@angular/core';
import {Upvote} from '../../models/upvote';
import Story from '../../models/story';
import {Observable, Subscription} from 'rxjs';
import {StoryState} from '../../store/story.state';
import {Store} from '@ngrx/store';
import {AppStates, selectStoryState} from '../../../app.states';
import {TRANSACTION_TYPES} from '../../../wallet/models/transaction';

@Component({
  selector: 'story-upvotes',
  templateUrl: './story-upvotes.component.html',
  styleUrls: ['./story-upvotes.component.scss']
})
export class StoryUpvotesComponent implements OnInit, OnDestroy {
  public upvotes: Upvote[];

  public isCollapsed = false;
  public story: Story;
  public story$: Observable<StoryState>;
  public storySub: Subscription;
  public isLoading = true;
  constructor(
    private store: Store<AppStates>,
  ) {
    this.story$ = this.store.select(selectStoryState);
  }

  public ngOnInit() {
    this.storySub = this.story$.subscribe((storyState: StoryState) => {
      this.isCollapsed = storyState.upvotes && storyState.upvotes.length > 20 ? true : false;
      this.story = storyState.story;
      this.upvotes = storyState.upvotes;
      this.isLoading = storyState.isLoadingProperties[TRANSACTION_TYPES.Upvote];
    });
  }

  public ngOnDestroy() {
    if (this.storySub) {
      this.storySub.unsubscribe();
    }
  }
}
