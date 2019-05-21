import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {AppActionTypes} from './app.actions';
import {UserCleanup, UserSetup} from '../user/user.actions';
import {WalletCleanup, WalletSetup} from '../wallet/wallet.actions';
import {AuthenticationService} from 'app/core/services/authentication.service';
import {LocalStorageToken} from '../../helpers/localStorage';

@Injectable()
export class AppEffects {

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private actions: Actions,
    private authenticationService: AuthenticationService,
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
