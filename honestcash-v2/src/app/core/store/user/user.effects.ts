import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';

import {
  UserActionTypes,
  UserSetup,
  UserLoaded,
  UserCleanup,
} from './user.actions';
import { LoginSuccessResponse, SignupSuccessResponse} from '../../models/authentication';
import {AuthenticationService} from '../../services/authentication.service';
import { UserService } from 'app/core/services/user.service';
import User from 'app/core/models/user';

@Injectable()
export class UserEffects {

  constructor(
    private actions: Actions,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

  @Effect()
  UserSetup: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.USER_SETUP),
    switchMap((_payload) =>
      this.userService.getMe().pipe(
        map(meResponse =>
          new UserLoaded({
            user: meResponse
          }
        )
        )
      )
    ),
    catchError((err) => of(new UserCleanup()))
  );

  @Effect({dispatch: false})
  UserCleanup: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.USER_CLEANUP),
    tap(() => {
      this.authenticationService.unsetToken();
    })
  );
}
