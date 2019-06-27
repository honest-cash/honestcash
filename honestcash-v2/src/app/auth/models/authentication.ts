import User from '../../user/models/user';
import {ISimpleWallet} from '../../wallet/models/simple-wallet';

export type FailedResponse = CodedErrorResponse | string;
export type LoginResponse = LoginSuccessResponse | FailedResponse;
export type SignupResponse = SignupSuccessResponse | FailedResponse;
export type CheckPasswordResponse = CheckPasswordSuccessResponse | FailedResponse;

export abstract class CodedErrorResponse {
  public code: string | number;
  public desc: string;
  public httpCode: number;
  public codeNo?: number;
}

export abstract class OkResponse {
  public ok: boolean;
}

export abstract class DataResponse {
  public data: any;
}

export abstract class EmptyResponse {
}

export interface LoginContext {
  email: string;
  password: string;
}

export interface LoginSuccessResponse {
  user: User;
  wallet: ISimpleWallet;
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
