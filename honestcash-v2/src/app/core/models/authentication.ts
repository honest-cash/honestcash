import User from './user';
import Wallet from './wallet';

export type FailedResponse = CodedErrorResponse | string;
export type LoginResponse = LoginSuccessResponse | FailedResponse;
export type SignupResponse = SignupSuccessResponse | FailedResponse;
export type CheckPasswordResponse = CheckPasswordSuccessResponse | FailedResponse;

export abstract class CodedErrorResponse {
  code: string | number;
  desc: string;
  httpCode: number;
  codeNo?: number;
}

export abstract class OkResponse {
  ok: boolean;
}

export abstract class DataResponse {
  data: any;
}

export abstract class EmptyResponse {
}

export interface LoginContext {
  email: string;
  password: string;
}

export interface LoginSuccessResponse {
  user: User;
  wallet: Wallet;
  token: string;
  password?: string;
}

export interface SignupContext {
  username: string;
  email: string;
  password: string;
  captcha: string;
}

export interface SignupSuccessResponse {
  user: User;
  token: string;
  password?: string;
}

export interface ResetPasswordRequestContext {
  email: string;
}

export interface ResetPasswordContext {
  email: string;
  code: string;
  newPassword: string;
  repeatNewPassword: string;
}

export interface CheckPasswordContext {
  email: string;
  code: string;
  newPassword: string;
  repeatNewPassword: string;
  mnemonicEncrypted: string;
}

export interface CheckPasswordSuccessResponse {
  isValid: boolean;
}
