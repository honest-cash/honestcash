import { Action } from '@ngrx/store';
import { IAuthRequestSuccessResponse } from '../../services/authentication.interfaces';

export enum UserActionTypes {
  USER_SETUP = '[User] User setup',
  USER_CLEANUP = '[User] User cleanup',
}

export class UserSetup implements Action {
  readonly type = UserActionTypes.USER_SETUP;
  constructor(public payload?: IAuthRequestSuccessResponse) {}
}

export class UserCleanup implements Action {
  readonly type = UserActionTypes.USER_CLEANUP;
  constructor() {}
}

export type All =
   | UserSetup
   | UserCleanup;
