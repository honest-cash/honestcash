import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {defer, Observable} from 'rxjs';
import {flatMap, map, tap} from 'rxjs/operators';
import {WalletActionTypes, WalletGenerated, WalletSetup} from './wallet.actions';
import {WalletService} from '../../services/wallet.service';
import {AuthenticationService} from 'app/core/services/authentication.service';
import {Logger} from 'app/core/services/logger.service';
import {LoginSuccessResponse} from '../../models/authentication';

@Injectable()
export class WalletEffects {
  private logger: Logger;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject('LOCALSTORAGE') private localStorage: Storage,
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
    map((action: WalletSetup) => action.payload),
    flatMap((payload?: LoginSuccessResponse) => defer(
      async () => await this.walletService.setupWallet(payload)
    )),
    tap((wallet) => {
      this.walletService.setWallet(wallet);
    }),
    tap((wallet) => {
      this.authenticationService.setWallet(wallet);
    }),
    map((wallet) => {
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
