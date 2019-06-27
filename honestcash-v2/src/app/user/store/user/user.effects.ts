import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

import {UserActionTypes, UserSetup} from './user.actions';
import {AuthService} from '../../../shared/services/auth.service';
import {LoginSuccessResponse, SignupSuccessResponse} from '../../../shared/models/authentication';
import {UserService} from '../../../shared/services/user.service';
import {AuthActionTypes} from '../../../auth/store/auth/auth.actions';

@Injectable()
export class UserEffects {

  constructor(
    private actions: Actions,
    private userService: UserService,
  ) {
  }

  @Effect({dispatch: false})
  public UserSetup: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.USER_SETUP),
    map((action: UserSetup) => action.payload),
    tap((payload?: LoginSuccessResponse | SignupSuccessResponse) => {
      if (payload) {
        return this.userService.init(payload.token, payload.user);
      }
      this.userService.init();
    }),
  );

  @Effect({dispatch: false})
  public UserCleanup: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.USER_CLEANUP),
    tap(() => {
      this.userService.unsetUser();
    })
  );

  @Effect({dispatch: false})
  public GetCurrentUser: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.USER_GET_CURRENT),
    switchMap(
      /* istanbul ignore next: functionality is tested but istanbul has incorrect coverage */
      () => this.userService.getCurrentUser()
    ),
  );
}
