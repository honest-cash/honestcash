import {Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectUserState} from '../../../app.states';
import {Observable, Subscription} from 'rxjs';
import User from '../../../user/models/user';
import Story from '../../models/story';
import {UserState} from '../../../user/store/user.state';
import {StoryService} from '../../services/story.service';
import {Upvote} from '../../models/upvote';
import {Unlock} from '../../models/unlock';
import {ActivatedRoute} from '@angular/router';
import {EditorStoryLoad} from '../../../editor/store/editor.actions';

@Component({
  selector: 'main-page-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class MainStoryComponent implements OnInit, OnDestroy {
  @HostBinding('class') public class = 'w-100 mb-auto mt-auto';
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
  ) {
    this.user$ = this.store.select(selectUserState);
    this.activatedRoute.params.subscribe(params => {
      this.storyService.getStoryWithDetails(params.storyId).subscribe((completeStory: any) => {
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
