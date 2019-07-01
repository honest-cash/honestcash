import {Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import Story from '../../models/story';
import {Observable, Subscription} from 'rxjs';
import {StoryState} from '../../store/story.state';
import {Store} from '@ngrx/store';
import {AppStates, selectStoryState} from '../../../app.states';

@Component({
  selector: 'story-actions-two',
  templateUrl: './story-actions-two.component.html',
  styleUrls: ['./story-actions-two.component.scss']
})
export class StoryActionsTwoComponent implements OnInit, OnDestroy {
  @HostBinding('class') public class = 'row mx-auto p-3 mt-3';
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
