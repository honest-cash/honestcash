import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {AppActionTypes} from './app.actions';
import {UserCleanup, UserSetup} from '../../../user/store/user/user.actions';
import {WalletCleanup, WalletSetup} from '../../../wallet/store/wallet/wallet.actions';
import {AuthService} from 'app/shared/services/auth.service';
import {LocalStorageToken} from '../../../core/helpers/localStorage';
import {UserService} from '../../../shared/services/user.service';
import {WalletService} from '../../../shared/services/wallet.service';

@Injectable()
export class AppEffects {

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private actions: Actions,
    private userService: UserService,
    private walletService: WalletService,
  ) {
  }

  @Effect()
  public AppLoad: Observable<any> = this.actions.pipe(
    ofType(AppActionTypes.APP_LOAD),
    map(() => this.userService.getToken() && this.walletService.getWalletMnemonic() !== ''),
    mergeMap((hasAuthorization: boolean) => {
        let actions = [];
        if (hasAuthorization) {
          actions = [new WalletSetup(), new UserSetup()];
        } else {
          actions = [new WalletCleanup(), new UserCleanup()];
        }

        return actions;
      }
    )
  );
}
