import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import User from '../../models/user';
import {Store} from '@ngrx/store';
import {AppStates, selectUserState} from '../../../app.states';
import {LogOut} from '../../../auth/store/auth.actions';
import {WindowToken} from '../../../../core/shared/helpers/window.helper';
import {Observable, Subscription} from 'rxjs';
import {UserState} from '../../store/user.state';

export const GOTO_PATHS = {
  profile: (username) => `/profile/${username}`,
  posts: () => `/posts`,
  wallet: () => `/wallet`,
  faq: () => `/honest_cash/frequently-asked-questions`,
  tos: () => `/honest_cash/honest-cash-terms-of-service-124`,
  privacyPolicy: () => `/honest_cash/honestcash-privacy-policy`,
};

@Component({
  selector: 'user-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class UserProfileMenuComponent implements OnInit, OnDestroy {
  public menuHidden = true;
  public user: User;
  public user$: Observable<UserState>;
  public userSub: Subscription;

  constructor(
    @Inject(WindowToken) private window,
    private store: Store<AppStates>,
  ) {
    this.user$ = this.store.select(selectUserState);
  }

  public ngOnInit() {
    this.userSub = this.user$.subscribe((userState: UserState) => {
      this.user = userState.user;
    });
  }

  public toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  public logout() {
    this.store.dispatch(new LogOut());
  }

  public goTo(path: string) {
    switch (path) {
      case 'profile':
        this.window.location.href = GOTO_PATHS.profile(this.user.username);
        break;
      case 'posts':
        this.window.location.href = GOTO_PATHS.posts();
        break;
      case 'wallet':
        this.window.location.href = GOTO_PATHS.wallet();
        break;
      case 'help':
        this.window.location.href = GOTO_PATHS.faq();
        break;
      case 'terms-of-service':
        this.window.location.href = GOTO_PATHS.tos();
        break;
      case 'privacy-policy':
        this.window.location.href = GOTO_PATHS.privacyPolicy();
        break;
      /* istanbul ignore next: testing is not needed */
      default:
        break;
    }
  }

  public ngOnDestroy(){
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
