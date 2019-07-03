import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectUserState} from '../../../app.states';
import User from '../../models/user';
import {Observable, Subscription} from 'rxjs';
import {UserState} from '../../store/user.state';
import {CodedResponse} from '../../../auth/models/authentication';
import {UserRelationsService} from '../../services/user.relations.service';

@Component({
  selector: 'user-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss'],
  providers: [
    UserRelationsService,
  ]
})
export class UserFollowButtonComponent implements OnInit, OnDestroy {
  @Input() public author: User;
  public user: User;
  public user$: Observable<UserState>;
  public userSub: Subscription;
  constructor(
    private store: Store<AppStates>,
    private userRelationsService: UserRelationsService,
  ) {
    this.user$ = this.store.select(selectUserState);
  }

  public ngOnInit() {
    this.userSub = this.user$.subscribe((userState: UserState) => {
      this.user = userState.user;
    });
  }

  public onButtonClicked() {
    if (this.author.alreadyFollowing) {
      this.userRelationsService.unfollowUser(this.author.id).subscribe((result: CodedResponse) => {
        if (result.code === 'UNFOLLOWED') {
          this.author.alreadyFollowing = false;
        }
      });
    } else {
      this.userRelationsService.followUser(this.author.id).subscribe((result: CodedResponse) => {
        if (result.code === 'FOLLOWED') {
          this.author.alreadyFollowing = true;
        }
      });
    }

  }

  public ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

}
