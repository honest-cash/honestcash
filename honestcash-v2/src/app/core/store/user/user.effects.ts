import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import {
  UserActionTypes,
  UserSetup,
} from './user.actions';
import { LoginSuccessResponse, SignupSuccessResponse} from '../../models/authentication';
import {AuthenticationService} from '../../services/authentication.service';

@Injectable()
export class UserEffects {

  constructor(
    private actions: Actions,
    private authenticationService: AuthenticationService,
  ) {}

  @Effect({dispatch: false})
  UserSetup: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.USER_SETUP),
    map((action: UserSetup) => action.payload),
    tap((payload: LoginSuccessResponse | SignupSuccessResponse) => {
      this.authenticationService.init(payload.token);
    })
  );

  @Effect({dispatch: false})
  UserCleanup: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.USER_CLEANUP),
    tap(() => {
      this.authenticationService.unsetToken();
    })
  );
}
