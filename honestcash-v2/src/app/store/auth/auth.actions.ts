import { Action } from '@ngrx/store';
import User from '../../models/user';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',
  USER_SETUP = '[Auth] User setup',
  FORGOT_PASSWORD = '[Auth] Forgot Password',
  FORGOT_PASSWORD_SUCCESS = '[Auth] Forgot Password Success',
  FORGOT_PASSWORD_FAILURE = '[Auth] Forgot Password Failure',
  LOGOUT = '[Auth] Logout',
  GET_STATUS = '[Auth] GetStatus'
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: {
    email: string;
    password: string;
  }) {}
}

export class UserSetup implements Action {
  readonly type = AuthActionTypes.USER_SETUP;
  constructor(public payload: {
    user: User
  }) {}
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public payload: {
    username: string;
    email: string;
    password: string;
    captcha: string;
  }) {}
}

export class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: any) {}
}

export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAILURE;
  constructor(public payload: any) {}
}

export class ForgotPassword implements Action {
  readonly type = AuthActionTypes.FORGOT_PASSWORD;
  constructor(public payload: any) {}
}

export class ForgotPasswordSuccess implements Action {
  readonly type = AuthActionTypes.FORGOT_PASSWORD_SUCCESS;
  constructor(public payload: any) {}
}

export class ChangePasswordAndWallet implements Action {
  readonly type = AuthActionTypes.FORGOT_PASSWORD;
  constructor(public payload: {
    username: string;
    email: string;
    password: string;
  }) {}
}

export class ForgotPasswordFailure implements Action {
  readonly type = AuthActionTypes.FORGOT_PASSWORD_FAILURE;
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
  | ForgotPassword
  | ForgotPasswordSuccess
  | ForgotPasswordFailure
  | UserSetup
  | LogOut
  | GetStatus;
