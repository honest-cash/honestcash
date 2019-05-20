import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AppActionTypes} from './app.actions';
import {UserCleanup, UserSetup} from '../user/user.actions';
import {WalletCleanup, WalletSetup} from '../wallet/wallet.actions';
import {AuthenticationService} from 'app/core/services/authentication.service';

@Injectable()
export class AppEffects {

  constructor(
    private actions: Actions,
    private authenticationService: AuthenticationService,
  ) {
  }

  @Effect()
  AppLoad: Observable<any> = this.actions.pipe(
    ofType(AppActionTypes.APP_LOAD),
    switchMap((value, index) => {
      let _actions = [];

      if (this.authenticationService.hasAuthorization()) {
        return _actions = [new WalletSetup(), new UserSetup()];
      }

      _actions = [new WalletCleanup(), new UserCleanup()];
      return _actions;
    }),
  );
}
