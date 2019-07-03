import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import Story from '../../models/story';
import {Store} from '@ngrx/store';
import {AppStates, selectStoryState} from '../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {StoryState} from '../../store/story.state';

@Component({
  selector: 'story-response-details',
  templateUrl: './response-details.component.html',
  styleUrls: ['./response-details.component.scss']
})
export class StoryResponseDetailsComponent implements OnInit, OnDestroy {
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
      this.story = storyState.story;
    });
  }

  public ngOnDestroy() {
    if (this.storySub) {
      this.storySub.unsubscribe();
    }
  }
}
