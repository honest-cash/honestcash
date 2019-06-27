import {Action} from '@ngrx/store';
import {LoginSuccessResponse, SignupSuccessResponse} from '../../auth/models/authentication';
import User from 'app/user/models/user';

export enum UserActionTypes {
  USER_SETUP = '[User] User setup',
  USER_CLEANUP = '[User] User cleanup',
  USER_LOADED = '[User] User loaded',
  USER_GET_CURRENT = '[User] User Get Current',
}

export class UserSetup implements Action {
  public readonly type = UserActionTypes.USER_SETUP;

  constructor(public payload?: LoginSuccessResponse | SignupSuccessResponse) {
  }
}

export class UserCleanup implements Action {
  public readonly type = UserActionTypes.USER_CLEANUP;
}

export class UserLoaded implements Action {
  public readonly type = UserActionTypes.USER_LOADED;

  constructor(public payload: { user: User }) {
  }
}

export class UserGetCurrent implements Action {
  public readonly type = UserActionTypes.USER_GET_CURRENT;
}

export type All =
  | UserSetup
  | UserLoaded
  | UserCleanup
  | UserGetCurrent;
