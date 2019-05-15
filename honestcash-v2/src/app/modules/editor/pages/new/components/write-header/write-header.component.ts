import {Component, Input, OnInit} from '@angular/core';
import User from '../../../../../../core/models/user';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmbeddableEditorComponent} from '../../../../embed/embed.component';
import {Store} from '@ngrx/store';
import {AppStates, selectAuthorizationState, selectUserState} from '../../../../../../app.states';
import {LogOut} from '../../../../../../core/store/auth/auth.actions';
import {Observable} from 'rxjs';
import {State as AuthorizationState} from '../../../../../../core/store/auth/auth.state';
import {State as UserState} from '../../../../../../core/store/user/user.state';
import {EDITOR_SAVE_STATUS} from '../../editor-write.component';
import Post from '../../../../../../core/models/post';

@Component({
   selector: 'app-editor-write-header',
   templateUrl: './write-header.component.html',
   styleUrls: ['./write-header.component.scss']
})
export class WriteHeaderComponent implements OnInit {
  @Input() public saveStatus: EDITOR_SAVE_STATUS = EDITOR_SAVE_STATUS.NotSaved;
  @Input() public story: Post = new Post();
  private EDITOR_SAVE_STATUS = EDITOR_SAVE_STATUS;
  public menuHidden = true;
  public authState: Observable<AuthorizationState>;
  public userState: Observable<UserState>;
  private user: User;

  constructor(
    private store: Store<AppStates>,
    private modalService: NgbModal
  ) {
    this.authState = this.store.select(selectAuthorizationState);
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

  saveDraft() {
    this.saveStatus = EDITOR_SAVE_STATUS.Saving;
    setTimeout(() => {
      this.saveStatus = EDITOR_SAVE_STATUS.Saved;
    }, 2000);
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
