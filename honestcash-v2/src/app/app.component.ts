import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStates, selectAuthorizationState, selectWalletState, selectUserState } from './app.states';
import {State as AuthorizationState} from './core/store/auth/auth.state';
import {State as WalletState} from './core/store/wallet/wallet.state';
import {State as UserState} from './core/store/user/user.state';
import { Observable } from 'rxjs';
import { Logger } from './core/services/logger.service';
import { AppLoad } from './core/store/app/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @HostBinding('class') class = 'h-full w-full flex flex-wrap';

  private logger: Logger;
  private wallet$: Observable<WalletState>;
  private auth$: Observable<AuthorizationState>;
  private user$: Observable<UserState>;

  constructor(
    private store: Store<AppStates>
  ) {
    this.logger = new Logger('AppComponent');

    this.wallet$ = this.store.select(selectWalletState);
    this.auth$ = this.store.select(selectAuthorizationState);
    this.user$ = this.store.select(selectUserState);

    this.store.dispatch(new AppLoad());
  }

  ngOnInit() {
    this.wallet$.subscribe(wallet => {
      this.logger.debug('new wallet', wallet);
    });

    this.auth$.subscribe(auth => {
      this.logger.debug('new auth', auth);
    });

    this.user$.subscribe(auth => {
      this.logger.debug('new user', auth);
    });
  }
}
