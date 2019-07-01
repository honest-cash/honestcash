import {Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import Story from '../../models/story';
import {Observable, Subscription} from 'rxjs';
import {StoryState} from '../../store/story.state';
import {Store} from '@ngrx/store';
import {AppStates, selectStoryState} from '../../../app.states';

@Component({
  selector: 'story-author',
  templateUrl: './story-author.component.html',
  styleUrls: ['./story-author.component.scss']
})
export class StoryAuthorComponent implements OnInit, OnDestroy {
  @HostBinding('class') public class = 'row mt-5';
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
