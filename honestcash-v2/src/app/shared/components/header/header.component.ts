import {Component, OnDestroy, OnInit} from '@angular/core';
import User from '../../models/user';
import {Store} from '@ngrx/store';
import {AppStates, selectUserState} from '../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {State as UserState} from '../../../store/user/user.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
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
