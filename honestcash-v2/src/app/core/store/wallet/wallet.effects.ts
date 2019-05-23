import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {WalletActionTypes, WalletCleanup, WalletGenerated, WalletSetup} from './wallet.actions';
import {WalletService} from '../../services/wallet.service';
import {Logger} from 'app/core/services/logger.service';
import {LoginSuccessResponse, SignupSuccessResponse} from '../../models/authentication';
import {LocalStorageToken} from '../../helpers/localStorage';
import {ISimpleBitcoinWallet} from '../../../shared/lib/WalletUtils';

@Injectable()
export class WalletEffects {
  private logger: Logger;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private actions: Actions,
    private walletService: WalletService,
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
    switchMap((payload?: LoginSuccessResponse | SignupSuccessResponse) => this.walletService.setupWallet(payload)),
    tap((wallet?: ISimpleBitcoinWallet) => {
      if (wallet) {
        this.walletService.setWallet(wallet);
        return wallet;
      }
    }),
    map((wallet?: ISimpleBitcoinWallet) => {
      if (wallet) {
        return new WalletGenerated({wallet});
      }
      return new WalletCleanup();
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
