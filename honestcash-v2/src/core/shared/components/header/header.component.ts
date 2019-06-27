import {Component, OnDestroy, OnInit} from '@angular/core';
import User from '../../../../app/user/models/user';
import {Store} from '@ngrx/store';
<<<<<<< HEAD
import {AppStates, selectAuthState, selectUserState} from '../../../../app/app.states';
import {LogOut} from '../../../../app/auth/store/auth.actions';
import {Observable} from 'rxjs';
import {State as AuthorizationState} from '../../../../app/auth/store/auth.state';
import {State as UserState} from '../../../../app/user/store/user.state';
import {WindowToken} from '../../../helpers/window';
import {GOTO_PATHS} from '../header-profile-menu/header-profile-menu.component';
=======
import {AppStates, selectUserState} from '../../../../app/app.states';
import {Observable, Subscription} from 'rxjs';
import {State as UserState} from '../../../store/user/user.state';
>>>>>>> redesign/story-page-1

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
