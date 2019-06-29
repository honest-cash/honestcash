import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {WalletState} from './store/wallet.state';
import {AppStates, selectWalletState} from '../app.states';
import {Store} from '@ngrx/store';
import {ISimpleWallet} from './models/simple-wallet';
import {WALLET_DEFAULT_HD_PATH, WALLET_SETUP_STATUS} from './services/wallet.service';

@Component({
  selector: 'wallet-container',
  templateUrl: './wallet-container.component.html',
  styleUrls: ['./wallet-container.component.scss']
})
export class WalletContainerComponent implements OnInit {

  public wallet$: Observable<WalletState>;
  public walletSub: Subscription;
  public wallet: ISimpleWallet;
  public WALLET_SETUP_STATUS = WALLET_SETUP_STATUS;
  public status: WALLET_SETUP_STATUS;
  public derivationPath = WALLET_DEFAULT_HD_PATH;

  constructor(
    private store: Store<AppStates>,
  ) {
    this.wallet$ = this.store.select(selectWalletState);
  }

  public ngOnInit() {
    this.walletSub = this.wallet$.subscribe((walletState: WalletState) => {
      this.wallet = walletState.wallet;
      this.status = walletState.status;
    });
  }

}
