import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState, selectWalletState } from './store/app.states';
import { Observable } from 'rxjs';
import { WalletSetup, WalletCleanup } from './store/wallet/wallet.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @HostBinding('class') class = 'h-screen w-screen flex flex-wrap';
  title = 'honestcash-v2';

  walletState: Observable<any>;
  authState: Observable<any>;

  constructor(
    private store: Store<AppState>
  ) {
    this.walletState = this.store.select(selectWalletState);
    this.authState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.authState.subscribe((authState) => {
      // depending on the result of authentification, setup or cleanup the wallet.
      this.store.dispatch(
        authState.token && authState.wallet ?
          new WalletSetup({
            // @refactor and hash it for encoding of the mnemonics
            password: authState.password,
            mnemonicEncrypted: authState.wallet.mnemonicEncrypted
          }) :
          new WalletCleanup()
      );
    });
  }
}
