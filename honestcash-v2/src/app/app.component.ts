import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStates, selectAuthorizationState, selectWalletState } from './app.states';
import {State as AuthorizationState} from './core/store/auth/auth.state';
import {State as WalletState} from './core/store/wallet/wallet.state';
import { Observable } from 'rxjs';
import { Logger } from './core';

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

  constructor(
    private store: Store<AppStates>
  ) {
    this.logger = new Logger('AppComponent');

    this.wallet$ = this.store.select(selectWalletState);
    this.auth$ = this.store.select(selectAuthorizationState);
  }

  ngOnInit() {
    this.wallet$.subscribe(wallet => {
      this.logger.debug(wallet);
    });

    this.auth$.subscribe(auth => {
      this.logger.debug(auth);
    });
  }
}
