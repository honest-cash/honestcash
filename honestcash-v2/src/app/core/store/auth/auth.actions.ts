import { Action } from '@ngrx/store';
import {
  IAuthRequest,
  IAuthRequestSuccessResponse,
  IAuthRequestFailedResponse,
} from '../../services/authentication.interfaces';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',
  RESET_PASSWORD = '[Auth] Reset Password',
  RESET_PASSWORD_SUCCESS = '[Auth] Reset Password Success',
  RESET_PASSWORD_FAILURE = '[Auth] Reset Password Failure',
  LOGOUT = '[Auth] Logout',
  GET_STATUS = '[Auth] GetStatus'
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: IAuthRequest) {}
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: IAuthRequestSuccessResponse) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: IAuthRequestFailedResponse | string) {}
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public payload: IAuthRequest) {}
}

export class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: IAuthRequestSuccessResponse) {}
}

export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAILURE;
  constructor(public payload: IAuthRequestFailedResponse | string) {}
}

export class ResetPassword implements Action {
  readonly type = AuthActionTypes.RESET_PASSWORD;
  constructor(public payload: any) {}
}

export class ResetPasswordSuccess implements Action {
  readonly type = AuthActionTypes.RESET_PASSWORD_SUCCESS;
  constructor(public payload: any) {}
}

export class ChangePasswordAndWallet implements Action {
  readonly type = AuthActionTypes.RESET_PASSWORD;
  constructor(public payload: {
    username: string;
    email: string;
    password: string;
  }) {}
}

export class ResetPasswordFailure implements Action {
  readonly type = AuthActionTypes.RESET_PASSWORD_FAILURE;
  constructor(public payload: any) {}
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class GetStatus implements Action {
  readonly type = AuthActionTypes.GET_STATUS;
}

export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | ResetPassword
  | ResetPasswordSuccess
  | ResetPasswordFailure
  | LogOut
  | GetStatus;
