import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import Story from './models/story';
import {Upvote} from './models/upvote';
import {Unlock} from './models/unlock';
import User from '../user/models/user';
import {Observable, Subscription} from 'rxjs';
import {UserState} from '../user/store/user.state';
import {Store} from '@ngrx/store';
import {AppStates, selectStoryState, selectUserState} from '../app.states';
import {ActivatedRoute} from '@angular/router';
import {StoryLoad} from './store/story.actions';
import {StoryState} from './store/story.state';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit, OnDestroy {
  @HostBinding('class') public class = 'd-flex flex-column justify-content-center';
  public story: Story;
  public comments: Story[];
  public upvotes: Upvote[];
  public unlocks: Unlock[];
  public user: User;
  public isLoading = true;
  private user$: Observable<UserState>;
  private userSub: Subscription;
  private story$: Observable<StoryState>;
  private storySub: Subscription;

  constructor(
    private meta: Meta,
    private title: Title,
    private store: Store<AppStates>,
    private activatedRoute: ActivatedRoute,
  ) {
    this.user$ = this.store.select(selectUserState);
    this.story$ = this.store.select(selectStoryState);
    this.activatedRoute.params.subscribe(params => {
      this.store.dispatch(new StoryLoad(params.storyIdOrAlias));
    });
  }

  public ngOnInit() {
    this.userSub = this.user$.subscribe((userState: UserState) => {
      this.user = userState.user;
    });

    this.storySub = this.story$.subscribe((storyState: StoryState) => {
      if (storyState) {
        this.story = storyState.story;
        this.comments = storyState.comments;
        this.upvotes = storyState.upvotes;
        this.unlocks = storyState.unlocks;
        this.isLoading = storyState.isLoading;

        if (!this.isLoading) {
          this.title.setTitle(`${this.story.title} | Honest Cash`);
          if (this.story.imageUrl) {
            this.meta.updateTag({name: 'og:image', content: this.story.imageUrl});
            this.meta.updateTag({name: 'twitter:image', content: this.story.imageUrl});
          }
        }
      }
    });
  }

  public ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    if (this.storySub) {
      this.storySub.unsubscribe();
    }
  }
}
