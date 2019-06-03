import {Action} from '@ngrx/store';
import {
  FailedResponse,
  LoginContext,
  LoginSuccessResponse,
  ResetPasswordContext,
  ResetPasswordRequestContext,
  SignupContext,
  SignupSuccessResponse
} from '../../shared/models/authentication';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',
  RESET_PASSWORD = '[Auth] Reset Password Request',
  RESET_PASSWORD_SUCCESS = '[Auth] Reset Password Success',
  RESET_PASSWORD_FAILURE = '[Auth] Reset Password Failure',
  RESET_PASSWORD_REQUEST = '[Auth] Reset Password',
  RESET_PASSWORD_REQUEST_SUCCESS = '[Auth] Reset Password Request Success',
  RESET_PASSWORD_REQUEST_FAILURE = '[Auth] Reset Password Request Failure',
  LOGOUT = '[Auth] Logout',
  GET_STATUS = '[Auth] GetStatus',
  ROOT_REDIRECT = '[Auth] Root Redirect',
  AUTH_CLEANUP = '[Auth] Auth cleanup'
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;

  constructor(public payload: LoginContext) {
  }
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;

  constructor(public payload: LoginSuccessResponse) {
  }
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;

  constructor(public payload: FailedResponse) {
  }
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGNUP;

  constructor(public payload: SignupContext) {
  }
}

export class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;

  constructor(public payload: SignupSuccessResponse) {
  }
}

export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAILURE;

  constructor(public payload: FailedResponse) {
  }
}

export class ResetPassword implements Action {
  readonly type = AuthActionTypes.RESET_PASSWORD;

  constructor(public payload: ResetPasswordContext) {
  }
}

export class ResetPasswordSuccess implements Action {
  readonly type = AuthActionTypes.RESET_PASSWORD_SUCCESS;
}

export class ResetPasswordFailure implements Action {
  readonly type = AuthActionTypes.RESET_PASSWORD_FAILURE;

  constructor(public payload: FailedResponse) {
  }
}

export class ResetPasswordRequest implements Action {
  readonly type = AuthActionTypes.RESET_PASSWORD_REQUEST;

  constructor(public payload: ResetPasswordRequestContext) {
  }
}

export class ResetPasswordRequestSuccess implements Action {
  readonly type = AuthActionTypes.RESET_PASSWORD_REQUEST_SUCCESS;
}

export class ResetPasswordRequestFailure implements Action {
  readonly type = AuthActionTypes.RESET_PASSWORD_REQUEST_FAILURE;

  constructor(public payload: FailedResponse) {
  }
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class GetStatus implements Action {
  readonly type = AuthActionTypes.GET_STATUS;
}

export class RootRedirect implements Action {
  readonly type = AuthActionTypes.ROOT_REDIRECT;
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
  | ResetPasswordRequest
  | ResetPasswordRequestSuccess
  | ResetPasswordRequestFailure
  | LogOut
  | GetStatus
  | RootRedirect;
