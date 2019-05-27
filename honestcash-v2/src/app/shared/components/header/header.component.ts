import {Component, Inject, OnInit} from '@angular/core';
import User from '../../../core/models/user';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmbeddableEditorComponent} from '../../../modules/editor/components/embed/embed.component';
import {Store} from '@ngrx/store';
import {AppStates, selectAuthState, selectUserState} from '../../../app.states';
import {LogOut} from '../../../core/store/auth/auth.actions';
import {Observable} from 'rxjs';
import {State as AuthorizationState} from '../../../core/store/auth/auth.state';
import {State as UserState} from '../../../core/store/user/user.state';
import {WindowToken} from '../../../core/helpers/window';
import {GOTO_PATHS} from '../header-profile-menu/header-profile-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public menuHidden = true;
  public authState: Observable<AuthorizationState>;
  public userState: Observable<UserState>;
  public user: User;

  constructor(
    @Inject(WindowToken) private window,
    private store: Store<AppStates>,
    private modalService: NgbModal
  ) {
    this.authState = this.store.select(selectAuthState);
    this.userState = this.store.select(selectUserState);
  }

  ngOnInit() {
    this.userState.subscribe((userState: UserState) => {
      this.user = userState.user;
    });
  }

  openEditorModal() {
    const modalRef = this.modalService.open(EmbeddableEditorComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });
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
