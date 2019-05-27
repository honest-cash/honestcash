import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {AppActionTypes} from './app.actions';
import {UserCleanup, UserSetup} from '../../core/store/user/user.actions';
import {WalletCleanup, WalletSetup} from '../../core/store/wallet/wallet.actions';
import {AuthService} from 'app/core/services/auth.service';
import {LocalStorageToken} from '../../core/helpers/localStorage';

@Injectable()
export class AppEffects {

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private actions: Actions,
    private authenticationService: AuthService,
  ) {
  }

  @Effect()
  AppLoad: Observable<any> = this.actions.pipe(
    ofType(AppActionTypes.APP_LOAD),
    map(() => this.authenticationService.hasAuthorization()),
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
