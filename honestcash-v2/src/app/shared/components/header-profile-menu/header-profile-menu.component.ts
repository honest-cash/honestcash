import {Component, Inject, Input} from '@angular/core';
import User from '../../../core/models/user';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../app.states';
import {LogOut} from '../../../core/store/auth/auth.actions';
import {WindowToken} from '../../../core/helpers/window';

export const GOTO_PATHS = {
  profile: (username) => `/profile/${username}`,
  posts: () => `/posts`,
  wallet: () => `/wallet`,
  faq: () => `/honest_cash/frequently-asked-questions`,
  tos: () => `/honest_cash/honest-cash-terms-of-service-124`,
  privacyPolicy: () => `/honest_cash/honestcash-privacy-policy`,
};

@Component({
  selector: 'app-header-profile-menu',
  templateUrl: './header-profile-menu.component.html',
  styleUrls: ['./header-profile-menu.component.scss']
})
export class HeaderProfileMenuComponent {
  public menuHidden = true;
  @Input() public user: User;

  constructor(
    @Inject(WindowToken) private window,
    private store: Store<AppStates>,
  ) {
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  logout() {
    this.store.dispatch(new LogOut());
  }

  goTo(path: string) {
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
}
