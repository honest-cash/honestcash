import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {UserActionTypes, UserSetup} from './user.actions';
import {AuthService} from '../../services/auth.service';
import {UserService} from 'app/core/services/user.service';
import {LoginSuccessResponse, SignupSuccessResponse} from '../../models/authentication';

@Injectable()
export class UserEffects {

  constructor(
    private actions: Actions,
    private authenticationService: AuthService,
    private userService: UserService
  ) {
  }

  @Effect({dispatch: false})
  UserSetup: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.USER_SETUP),
    map((action: UserSetup) => action.payload),
    tap((payload?: LoginSuccessResponse | SignupSuccessResponse) => {
      if (payload) {
        return this.authenticationService.init(payload.token, payload.user.id);
      }
      return this.authenticationService.init();
    })
  );

  @Effect({dispatch: false})
  UserCleanup: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.USER_CLEANUP),
    tap(() => {
      this.authenticationService.unsetTokenAndUnAuthenticate();
    })
  );
}
