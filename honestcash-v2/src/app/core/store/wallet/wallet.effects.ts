import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import {
    WalletActionTypes,
    WalletSetup,
} from './wallet.actions';
import { WalletService } from '../../services/wallet.service';

@Injectable()
export class WalletEffects {
  constructor(
    private actions: Actions,
    private walletService: WalletService,
  ) {}

  @Effect({ dispatch: false })
  WalletSetup: Observable<any> = this.actions.pipe(
    ofType(WalletActionTypes.WALLET_SETUP),
    map((action: WalletSetup) => ({
      mnemonicEncrypted: action.payload.wallet.mnemonicEncrypted,
      password: action.payload.password,
    })),
    tap(({ password, mnemonicEncrypted }) => this.walletService.setWallet(password, mnemonicEncrypted)),
  );

  @Effect({ dispatch: false })
  WalletCleanup: Observable<any> = this.actions.pipe(
    ofType(WalletActionTypes.WALLET_CLEANUP),
    tap(() => {
      this.walletService.unsetWallet();
    }),
  );

}
