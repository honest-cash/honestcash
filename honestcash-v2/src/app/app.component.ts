import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectAuthState, selectUserState, selectWalletState} from './app.states';
import {AppLoad} from './store/app/app.actions';
import {Observable} from 'rxjs';
import {State as WalletState} from './store/wallet/wallet.state';
import {State as AuthState} from './store/auth/auth.state';
import {State as UserState} from './store/user/user.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private walletState: Observable<WalletState>;
  private authState: Observable<AuthState>;
  private userState: Observable<UserState>;

  constructor(
    private store: Store<AppStates>
  ) {

    this.walletState = this.store.select(selectWalletState);
    this.authState = this.store.select(selectAuthState);
    this.userState = this.store.select(selectUserState);

    this.store.dispatch(new AppLoad());
  }

  ngOnInit() {
  }
}
