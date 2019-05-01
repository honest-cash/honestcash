import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  AppActionTypes,
} from './app.actions';
import { UserSetup } from '../user/user.actions';
import { WalletSetup } from '../wallet/wallet.actions';

@Injectable()
export class AppEffects {

  constructor(
    private actions: Actions,
  ) {}

  @Effect()
  AppLoad: Observable<any> = this.actions.pipe(
    ofType(AppActionTypes.APP_LOAD),
    switchMap((action) => [ new UserSetup(), new WalletSetup() ]),
  );
}
