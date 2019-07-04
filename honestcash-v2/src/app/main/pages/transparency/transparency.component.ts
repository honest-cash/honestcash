import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import Story from '../../../story/models/story';
import {Observable, Subscription} from 'rxjs';
import {StoryState} from '../../../story/store/story.state';
import {Store} from '@ngrx/store';
import {AppStates, selectStoryState} from '../../../app.states';
import {StoryLoad} from '../../../story/store/story.actions';


@Component({
  selector: 'main-page-transparency',
  templateUrl: './transparency.component.html',
  styleUrls: ['./transparency.component.scss']
})
export class MainTransparencyComponent implements OnInit, OnDestroy {
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
    this.store.dispatch(new StoryLoad(129));
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
