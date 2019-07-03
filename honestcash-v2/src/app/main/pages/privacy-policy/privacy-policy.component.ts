import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import Story from '../../../story/models/story';
import {Observable, Subscription} from 'rxjs';
import {StoryState} from '../../../story/store/story.state';
import {Store} from '@ngrx/store';
import {AppStates, selectStoryState} from '../../../app.states';
import {StoryLoad} from '../../../story/store/story.actions';


@Component({
  selector: 'main-page-terms-of-service',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class MainPrivacyPolicyComponent implements OnInit, OnDestroy {
  @HostBinding('class') public class = 'card m-auto';
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
    this.store.dispatch(new StoryLoad(133));
    this.storySub = this.story$.subscribe((storyState: StoryState) => {
      this.story = storyState.story;

      if (this.story && this.story.title) {
        this.isLoading = false;
      }
    });
  }

  public ngOnDestroy() {
    if (this.storySub) {
      this.storySub.unsubscribe();
    }
  }
}
