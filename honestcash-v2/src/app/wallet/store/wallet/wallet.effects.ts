import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {WalletActionTypes, WalletCleanup, WalletGenerated, WalletSetup, WalletSetupFailed} from './wallet.actions';
import {WalletService} from '../../../shared/services/wallet.service';
import {LoginSuccessResponse, SignupSuccessResponse} from '../../../shared/models/authentication';
import {LocalStorageToken} from '../../../core/helpers/localStorage';
import {ISimpleBitcoinWallet} from '../../../shared/lib/WalletUtils';
import {UserCleanup} from '../../../user/store/user/user.actions';

@Injectable()
export class WalletEffects {

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private actions: Actions,
    private walletService: WalletService,
  ) {
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
    switchMap((payload?: LoginSuccessResponse | SignupSuccessResponse) => this.walletService.setupWallet(payload)
      .pipe(
        map((wallet: ISimpleBitcoinWallet) => new WalletGenerated({wallet})),
        catchError(() => of(new WalletSetupFailed()))
      )
    ),
  );

  @Effect()
  WalletSetupFailed: Observable<any> = this.actions.pipe(
    ofType(WalletActionTypes.WALLET_SETUP_FAILED),
    switchMap(() => [new UserCleanup(), new WalletCleanup()]),
  );

  @Effect({dispatch: false})
  WalletCleanup: Observable<any> = this.actions.pipe(
    ofType(WalletActionTypes.WALLET_CLEANUP),
    tap(() => {
      this.walletService.unsetWallet();
    }),
  );
}
