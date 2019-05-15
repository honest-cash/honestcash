import {Component, Input, OnInit} from '@angular/core';
import User from '../../../core/models/user';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../app.states';
import {LogOut} from '../../../core/store/auth/auth.actions';

@Component({
             selector: 'app-header-profile-menu',
             templateUrl: './header-profile-menu.component.html',
             styleUrls: ['./header-profile-menu.component.scss']
           })
export class HeaderProfileMenuComponent implements OnInit {
  private menuHidden = true;
  @Input() public user: User;

  constructor(
    private store: Store<AppStates>,
  ) {
  }

  ngOnInit() {
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
        window.location.href = `/profile/${this.user.username}`;
        break;
      case 'posts':
        window.location.href = `/posts`;
        break;
      case 'wallet':
        window.location.href = `/wallet`;
        break;
      case 'help':
        window.location.href = `/honest_cash/frequently-asked-questions`;
        break;
      case 'terms-of-service':
        window.location.href = `/honest_cash/honest-cash-terms-of-service-124`;
        break;
      case 'privacy-policy':
        window.location.href = `/honest_cash/honestcash-privacy-policy`;
        break;
      default:
        break;
    }
  }
}
