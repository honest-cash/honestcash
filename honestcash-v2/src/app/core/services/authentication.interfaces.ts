import User from '../../models/user';

export type FailedResponse = CodedErrorResponse | string;

export abstract class CodedErrorResponse {
  code: string | number;
  desc: string;
  httpCode: number;
  codeNo?: number;
}

export interface LoginContext {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  wallet: any;
  token: string;
  password?: string;
}

export interface SignupContext {
  username: string;
  email: string;
  password: string;
  captcha: string;
}

export interface SignupResponse {
  user: User;
  token: string;
  password?: string;
}

export interface ResetPasswordContext {
  email: string;
}

export interface ChangePasswordContext {
  email: string;
  code: string;
  newPassword: string;
  repeatNewPassword: string;
  mnemonicEncrypted: string;
}

export interface CheckPasswordContext {
  email: string;
  code: string;
  newPassword: string;
  repeatNewPassword: string;
  mnemonicEncrypted: string;
}

export interface CheckPasswordResponse {
  isValid: boolean;
}

export interface SetWalletContext {
  mnemonicEncrypted: string;
}
