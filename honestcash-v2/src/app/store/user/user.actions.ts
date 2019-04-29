import { Action } from '@ngrx/store';
import { ILogInSuccessResponse } from 'app/services/auth.service';

export enum UserActionTypes {
  USER_SETUP = '[User] User setup',
  USER_CLEANUP = '[User] User cleanup',
}

export class UserSetup implements Action {
  readonly type = UserActionTypes.USER_SETUP;
  constructor(public payload: ILogInSuccessResponse) {}
}

export class UserCleanup implements Action {
  readonly type = UserActionTypes.USER_CLEANUP;
  constructor() {}
}

export type All =
   | UserSetup
   | UserCleanup;
