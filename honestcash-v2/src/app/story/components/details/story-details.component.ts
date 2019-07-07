import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import Story from '../../models/story';
import {Observable, Subscription} from 'rxjs';
import {StoryState} from '../../store/story.state';
import {Store} from '@ngrx/store';
import {AppStates, selectStoryState, selectUserState} from '../../../app.states';
import {WindowToken} from '../../../../core/shared/helpers/window.helper';
import User from '../../../user/models/user';
import {UserState} from '../../../user/store/user.state';

@Component({
  selector: 'story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.scss']
})
export class StoryDetailsComponent implements OnInit, OnDestroy {
  public story: Story;
  public story$: Observable<StoryState>;
  public storySub: Subscription;
  public user: User;
  public user$: Observable<UserState>;
  public userSub: Subscription;
  constructor(
    @Inject(WindowToken) private window,
    private store: Store<AppStates>,
  ) {
    this.story$ = this.store.select(selectStoryState);
    this.user$ = this.store.select(selectUserState);
  }

  public ngOnInit() {
    this.storySub = this.story$.subscribe((storyState: StoryState) => {
      this.story = storyState.story;
    });
    this.userSub = this.user$.subscribe((userState: UserState) => {
      this.user = userState.user;
    });
  }

  public goToUserProfile() {
      this.window.location.href = `/profile/${this.story.user.username}`;
  }

  public ngOnDestroy() {
    if (this.storySub) {
      this.storySub.unsubscribe();
    }
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

}
