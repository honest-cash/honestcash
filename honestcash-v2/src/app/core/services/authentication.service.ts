import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import User from '../../models/user';
import { CryptoUtils } from '../../shared/lib/CryptoUtils';
import { HttpService } from '..';
import { AppState } from 'app/app.states';

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

export const LOCAL_TOKEN_KEY = 'HC_USER_TOKEN';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private _token: string;
  private _isAuthenticated = false;

  constructor(
    private http: HttpService
  ) {}

  set token(token: string) {
    this._token = token;
    localStorage.setItem(LOCAL_TOKEN_KEY, token);
  }

  get token(): string {
    return this._token || localStorage.getItem(LOCAL_TOKEN_KEY);
  }

  set isAuthenticated(isAuthenticated: boolean) {
    this._isAuthenticated = isAuthenticated;
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  public unsetToken(): void {
    this._token = 'false';
    this._isAuthenticated = false;
    localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  public logIn(payload: IAuthRequest): Observable<IAuthRequestSuccessResponse | IAuthRequestFailedResponse> {
    const url = `/login`;

    const passwordHash = CryptoUtils.calculatePasswordHash(payload.email, payload.password);

    return this.http.post<IAuthRequestSuccessResponse | IAuthRequestFailedResponse>(url, {email: payload.email, password: passwordHash});
  }

  public signUp(payload: IAuthRequest): Observable<User> {
    const url = `/signup/email`;

    const passwordHash = CryptoUtils.calculatePasswordHash(payload.email, payload.password);

    return this.http.post<User>(url, {
      username: payload.username,
      email: payload.email,
      password: passwordHash,
      captcha: payload.captcha
    });
  }

  public resetPassword(email: string): Observable<User> {
    const url = `/register`;

    return this.http.post<User>(url, {
      email
    });
  }

  public changePassword(data: {
    email: string;
    code: string,
    newPassword: string,
    repeatNewPassword: string;
    mnemonicEncrypted: string;
  }) {
    return this.http.post(`/auth/reset-password"`, data);
  }

  getStatus(): Observable<User> {
    const url = `/status`;
    return this.http.get<User>(url);
  }
}
