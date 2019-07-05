import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import Story from '../../../story/models/story';
import {Observable, Subscription} from 'rxjs';
import {StoryState} from '../../../story/store/story.state';
import {Store} from '@ngrx/store';
import {AppStates, selectStoryState} from '../../../app.states';
import {StoryLoad} from '../../../story/store/story.actions';


@Component({
  selector: 'main-page-about-honest-cash',
  templateUrl: './about-honest-cash.component.html',
  styleUrls: ['./about-honest-cash.component.scss']
})
export class MainAboutHonestCashComponent implements OnInit, OnDestroy {
  @HostBinding('class') public class = 'm-auto';
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
    this.store.dispatch(new StoryLoad(56));
    this.storySub = this.story$.subscribe((storyState: StoryState) => {
      this.story = storyState.story;
      this.isLoading = storyState.isLoading;
    });
  }

  public ngOnDestroy() {
    if (this.storySub) {
      this.storySub.unsubscribe();
    }
  }
}
