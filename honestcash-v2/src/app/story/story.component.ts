import {Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import Story from './models/story';
import {Upvote} from './models/upvote';
import {Unlock} from './models/unlock';
import User from '../user/models/user';
import {Observable, Subscription} from 'rxjs';
import {UserState} from '../user/store/user.state';
import {Store} from '@ngrx/store';
import {AppStates, selectUserState} from '../app.states';
import {ActivatedRoute} from '@angular/router';
import {StoryService} from './services/story.service';
import {WalletService} from '../wallet/services/wallet.service';

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

  constructor(
    private store: Store<AppStates>,
    private activatedRoute: ActivatedRoute,
    private storyService: StoryService,
    private walletService: WalletService,
  ) {
    //this.walletService.updateWalletBalances();
    this.user$ = this.store.select(selectUserState);
    this.activatedRoute.params.subscribe(params => {
      this.storyService.getStoryWithDetails(params.storyIdOrAlias).subscribe((completeStory: any) => {
        const story = completeStory[0];
        const comments = completeStory[1];
        const upvotes = completeStory[2];
        const unlocks = completeStory[3];
        this.story = story;
        this.comments = comments;
        this.upvotes = upvotes;
        this.unlocks = unlocks;
        this.isLoading = false;
      });
    });
  }

  public ngOnInit() {
    this.userSub = this.user$.subscribe((userState: UserState) => {
      this.user = userState.user;
    });
  }

  public ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
