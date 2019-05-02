import User from '../../models/user';

export interface IAuthRequest {
  username?: string;
  email: string;
  password: string;
  captcha?: string;
}


export interface IAuthRequestSuccessResponse {
  user: User;
  wallet?: any;
  token?: string;
  password?: string;
}

export interface IAuthRequestFailedResponse {
  code: string;
  desc: string;
  httpCode: number;
}

export interface Credentials {
  token: string;
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}
