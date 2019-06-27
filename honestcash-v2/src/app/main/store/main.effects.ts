import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {MainActionTypes} from './main.actions';
import {UserCleanup, UserSetup} from '../../user/store/user.actions';
import {WalletCleanup, WalletSetup} from '../../wallet/store/wallet.actions';
import {AuthService} from 'app/auth/services/auth.service';
import {LocalStorageToken} from '../../../core/helpers/local-storage.helper';
import {UserService} from '../../user/services/user.service';
import {WalletService} from '../../wallet/services/wallet.service';

@Injectable()
export class MainEffects {

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private actions: Actions,
    private userService: UserService,
    private walletService: WalletService,
  ) {
  }

  @Effect()
  public MainLoad: Observable<any> = this.actions.pipe(
    ofType(MainActionTypes.MAIN_LOAD),
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
