import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {UserActionTypes, UserSetup} from './user.actions';
import {AuthService} from '../../shared/services/auth.service';
import {LoginSuccessResponse, SignupSuccessResponse} from '../../shared/models/authentication';

@Injectable()
export class UserEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
  ) {
  }

  @Effect({dispatch: false})
  UserSetup: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.USER_SETUP),
    map((action: UserSetup) => action.payload),
    tap((payload?: LoginSuccessResponse | SignupSuccessResponse) => {
      if (payload) {
        return this.authService.init(payload.token, payload.user);
      }
      this.authService.init();
    }),
  );

  @Effect({dispatch: false})
  UserCleanup: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.USER_CLEANUP),
    tap(() => {
      this.authService.unsetTokenAndUnAuthenticate();
    })
  );
}
