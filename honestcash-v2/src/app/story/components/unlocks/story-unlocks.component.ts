import {Component, OnDestroy, OnInit} from '@angular/core';
import Story from '../../models/story';
import {Unlock} from '../../models/unlock';
import {Observable, Subscription} from 'rxjs';
import {StoryState} from '../../store/story.state';
import {Store} from '@ngrx/store';
import {AppStates, selectStoryState} from '../../../app.states';
import {TRANSACTION_TYPES} from '../../../wallet/models/transaction';

@Component({
  selector: 'story-unlocks',
  templateUrl: './story-unlocks.component.html',
  styleUrls: ['./story-unlocks.component.scss']
})
export class StoryUnlocksComponent implements OnInit, OnDestroy {
  public unlocks: Unlock[];

  public isCollapsed = false;
  public isLoading = true;
  public story: Story;
  public story$: Observable<StoryState>;
  public storySub: Subscription;
  constructor(
    private store: Store<AppStates>,
  ) {
    this.story$ = this.store.select(selectStoryState);
  }

  public ngOnInit() {
    this.storySub = this.story$.subscribe((storyState: StoryState) => {
      this.isCollapsed = storyState.unlocks && storyState.unlocks.length > 20 ? true : false;
      this.story = storyState.story;
      this.unlocks = storyState.unlocks;
      this.isLoading = storyState.isLoadingProperties[TRANSACTION_TYPES.Unlock];
    });
  }

  public ngOnDestroy() {
    if (this.storySub) {
      this.storySub.unsubscribe();
    }
  }
}
