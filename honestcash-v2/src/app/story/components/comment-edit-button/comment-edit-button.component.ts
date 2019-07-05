import {Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output} from '@angular/core';
import Story from '../../models/story';
import {Store} from '@ngrx/store';
import {AppStates, selectUserState} from '../../../app.states';
import {StoryCommentClicked, StoryCommentDraftLoad} from '../../store/story.actions';
import User from '../../../user/models/user';
import {Observable, Subscription} from 'rxjs';
import {UserState} from '../../../user/store/user.state';
import {Router} from '@angular/router';

@Component({
  selector: 'story-comment-edit-button',
  templateUrl: './comment-edit-button.component.html',
  styleUrls: ['./comment-edit-button.component.scss']
})
export class StoryCommentEditButtonComponent implements OnInit, OnDestroy {
  @Input() public parentStory: Story;
  @HostBinding('class') public class = 'ml-2'
  public user: User;
  public user$: Observable<UserState>;
  public userSub: Subscription;
  constructor(
    private store: Store<AppStates>,
    private router: Router,
  ) {
    this.user$ = this.store.select(selectUserState);
    this.userSub = this.user$.subscribe((userState: UserState) => {
      this.user = userState.user;
    });
  }

  public ngOnInit() {
  }

  public onEditClicked() {
    if (this.user) {
      this.store.dispatch(new StoryCommentDraftLoad({storyId: this.parentStory.id, isLoadingSelf: true}));
    } else {
      this.router.navigate(['/login']);
    }
  }

  public ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

}
