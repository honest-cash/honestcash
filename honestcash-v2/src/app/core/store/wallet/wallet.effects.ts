import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import {
    WalletActionTypes,
    WalletSetup,
    WalletGenerated
} from './wallet.actions';
import { WalletService } from '../../services/wallet.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { WalletUtils } from 'app/shared/lib/WalletUtils';
import Wallet from 'app/core/models/wallet';
import { Logger } from 'app/core/services/logger.service';

@Injectable()
export class WalletEffects {
  private logger: Logger;
  constructor(
    private actions: Actions,
    private walletService: WalletService,
    private authentificationService: AuthenticationService
  ) {
    this.logger = new Logger('WalletEffects');
  }

  /**
   * If the wallet is defined during the log in, it will set it locally.
   * If the wallet is not defined during the log in, it will create, save and set a new one.
   *
   * This needs to be booletproof code! @todo 100% tests coverage.
   */
  @Effect()
  WalletSetup: Observable<any> = this.actions.pipe(
    ofType(WalletActionTypes.WALLET_SETUP),
    map((action: WalletSetup) => ({
      mnemonicEncrypted: action.payload.wallet ? action.payload.wallet.mnemonicEncrypted : undefined,
      password: action.payload.password,
    })),
    map(({ password, mnemonicEncrypted }) => {
      let simpleWallet: Wallet;

      if (mnemonicEncrypted) {
        this.logger.info('Setting up an already existing wallet');

        simpleWallet = WalletUtils.generateWalletWithEncryptedRecoveryPhrase(mnemonicEncrypted, password);
      } else {
        this.logger.info('Setting up a new wallet');

        simpleWallet = WalletUtils.generateNewWallet(password);
      }

      return { wallet: simpleWallet };
    }),
    tap(({ wallet }) => {
      this.walletService.setWallet(wallet.mnemonic);
    }),
    tap(({ wallet }) => {
      this.authentificationService.setWallet({ mnemonicEncrypted: wallet.mnemonicEncrypted});
    }),
    map(({ wallet }) => {
      return new WalletGenerated({
        wallet
      });
    }),
  );

  @Effect({ dispatch: false })
  WalletCleanup: Observable<any> = this.actions.pipe(
    ofType(WalletActionTypes.WALLET_CLEANUP),
    tap(() => {
      this.walletService.unsetWallet();
    }),
  );
}
