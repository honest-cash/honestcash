import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStates, selectUserState} from '../../../../app/app.states';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {UserState} from '../../../../app/user/store/user.state';
import User from '../../../../app/user/models/user';

@Component({
  selector: 'core-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class CoreHeaderComponent implements OnInit, OnDestroy {
  public menuHidden = true;
  public user$: Observable<UserState>;
  public user: User;
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
