import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  AppActionTypes,
} from './app.actions';
import { UserSetup } from '../user/user.actions';
import { WalletSetup } from '../wallet/wallet.actions';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { WalletService } from 'app/core/services/wallet.service';

@Injectable()
export class AppEffects {

  constructor(
    private actions: Actions,
    private authenticationService: AuthenticationService,
    private walletService: WalletService
  ) {}

  @Effect()
  AppLoad: Observable<any> = this.actions.pipe(
    ofType(AppActionTypes.APP_LOAD),
    switchMap(() => {
      const actionsOnLoad = [];

      if (this.authenticationService.getToken()) {
        actionsOnLoad.push(new WalletSetup({
          mnemonic: this.walletService.getWalletMnemonic(),
          password: undefined
        }));

        actionsOnLoad.push(new UserSetup());
      }

      return actionsOnLoad;
    }),
  );
}
