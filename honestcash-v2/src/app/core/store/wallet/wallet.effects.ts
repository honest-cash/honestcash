import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {defer, Observable} from 'rxjs';
import {map, mergeMap, tap} from 'rxjs/operators';
import {WalletActionTypes, WalletGenerated, WalletSetup} from './wallet.actions';
import {WalletService} from '../../services/wallet.service';
import {AuthenticationService} from 'app/core/services/authentication.service';
import {ISimpleBitcoinWallet, WalletUtils} from 'app/shared/lib/WalletUtils';
import {Logger} from 'app/core/services/logger.service';

@Injectable()
export class WalletEffects {
  private logger: Logger;

  constructor(
    private actions: Actions,
    private walletService: WalletService,
    private authenticationService: AuthenticationService
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
    map((action: WalletSetup) => {
      return action.payload;
    }),
    mergeMap((payload) => defer(async () => {
      let simpleWallet: ISimpleBitcoinWallet;

      if (!payload.wallet || !payload.wallet.mnemonicEncrypted) {
        this.logger.info('Creating new wallet.');

        simpleWallet = await WalletUtils.generateNewWallet(payload.password);
      } else if (payload.wallet && payload.wallet.mnemonic) {
        this.logger.info('Setting up an already existing wallet');

        simpleWallet = await WalletUtils.generateWalletWithEncryptedRecoveryPhrase(payload.wallet.mnemonic, payload.password);
      }

      return {wallet: simpleWallet};
    })),
    tap(({wallet}) => {
      this.walletService.setWallet(wallet.mnemonic);
    }),
    tap(({wallet}) => {
      this.authenticationService.setWallet({mnemonicEncrypted: wallet.mnemonicEncrypted});
    }),
    map(({wallet}) => {
      return new WalletGenerated({
        wallet
      });
    }),
  );

  @Effect({dispatch: false})
  WalletCleanup: Observable<any> = this.actions.pipe(
    ofType(WalletActionTypes.WALLET_CLEANUP),
    tap(() => {
      this.walletService.unsetWallet();
    }),
  );
}
