import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectUserState} from '../../../../app/app.states';
import User from '../../../../app/user/models/user';
import {Observable, Subscription} from 'rxjs';
import {UserState} from '../../../../app/user/store/user.state';

@Component({
  selector: 'shared-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss']
})
export class SharedFollowButtonComponent implements OnInit, OnDestroy {
  public user: User;
  public user$: Observable<UserState>;
  public userSub: Subscription;
  constructor(
    private store: Store<AppStates>,
  ) {
    this.user$ = this.store.select(selectUserState);
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
