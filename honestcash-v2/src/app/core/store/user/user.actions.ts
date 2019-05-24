import {Action} from '@ngrx/store';
import {LoginSuccessResponse, SignupSuccessResponse} from '../../models/authentication';
import User from 'app/core/models/user';

export enum UserActionTypes {
  USER_SETUP = '[User] User setup',
  USER_CLEANUP = '[User] User cleanup',
  USER_LOADED = '[User] User loaded',
}

export class UserSetup implements Action {
  readonly type = UserActionTypes.USER_SETUP;

  constructor(public payload?: LoginSuccessResponse | SignupSuccessResponse) {
  }
}

export class UserCleanup implements Action {
  readonly type = UserActionTypes.USER_CLEANUP;

  constructor() {
  }
}

export class UserLoaded implements Action {
  readonly type = UserActionTypes.USER_LOADED;

  constructor(public payload: { user: User }) {
  }
}

export type All =
  | UserSetup
  | UserLoaded
  | UserCleanup;
