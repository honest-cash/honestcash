import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import {
  UserActionTypes,
  UserSetup,
} from './user.actions';
import { IAuthRequestSuccessResponse } from '../../services/authentication.interfaces';
import { UserService } from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';

@Injectable()
export class UserEffects {

  constructor(
    private actions: Actions,
    private authenticationService: AuthenticationService,
    private userService: UserService,
  ) {}

  @Effect({dispatch: false})
  UserSetup: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.USER_SETUP),
    map((action: UserSetup) => action.payload),
    tap((payload: IAuthRequestSuccessResponse) => {
      this.authenticationService.init(payload.token);
      this.userService.checkAddressBCH(payload);
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
