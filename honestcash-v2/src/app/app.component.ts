import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectAuthState, selectUserState, selectWalletState} from './app.states';
import {Logger} from './core/services/logger.service';
import {AppLoad} from './core/store/app/app.actions';
import {Observable} from 'rxjs';
import {State as WalletState} from './core/store/wallet/wallet.state';
import {State as AuthState} from './core/store/auth/auth.state';
import {State as UserState} from './core/store/user/user.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private logger: Logger;
  private walletState: Observable<WalletState>;
  private authState: Observable<AuthState>;
  private userState: Observable<UserState>;

  constructor(
    private store: Store<AppStates>
  ) {
    this.logger = new Logger('AppComponent');

    this.walletState = this.store.select(selectWalletState);
    this.authState = this.store.select(selectAuthState);
    this.userState = this.store.select(selectUserState);

    this.store.dispatch(new AppLoad());
  }

  // remove this when there is something real
  // inside ngOnInit
  /* istanbul ignore next*/
  ngOnInit() {
    /* istanbul ignore next*/
    this.walletState.subscribe(wallet => {
      this.logger.debug('new wallet', wallet);
    });

    /* istanbul ignore next*/
    this.authState.subscribe(auth => {
      this.logger.debug('new auth', auth);
    });

    /* istanbul ignore next*/
    this.userState.subscribe(auth => {
      this.logger.debug('new user', auth);
    });
  }
}
