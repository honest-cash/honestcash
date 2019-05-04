import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from '../models/user';
import { CryptoUtils } from '../../shared/lib/CryptoUtils';
import { HttpService } from '..';
import {
  ChangePasswordContext, CheckPasswordContext, CheckPasswordResponse, CheckPasswordSuccessResponse,
  FailedResponse,
  LoginContext, LoginResponse,
  LoginSuccessResponse,
  ResetPasswordContext, SetWalletContext,
  SignupContext, SignupResponse, SignupSuccessResponse
} from '../models/authentication';

export const LOCAL_TOKEN_KEY = 'HC_USER_TOKEN';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public API_ENDPOINTS = {
    login: `/login`,
    signup: `/signup/email`,
    logout: `/logout`,
    resetPassword: `/auth/request-password-reset`,
    changePassword: `/auth/reset-password`,
    checkPassword: `/auth/password-check`,
    setWallet: `/auth/set-wallet`,
    getEmails: `/auth/emails`,
    status: `/me`,
  };

  private token: string;
  private isAuthenticated = false;

  constructor(
    private http: HttpService
  ) {}

  public getToken(): string {
    let token;
    if (!this.token && (token = localStorage.getItem(LOCAL_TOKEN_KEY))) {
      this.token = token;
    }
    return this.token;
  }

  public setToken(token: string) {
    this.token = token;
    localStorage.setItem(LOCAL_TOKEN_KEY, token);
  }

  public unsetToken(): void {
    this.token = '';
    this.isAuthenticated = false;
    localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  public hasAuthorization(): boolean {
    if (!this.isAuthenticated && this.getToken()) {
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }

  public init(token?: string) {
    if (!token && this.getToken()) {
      this.isAuthenticated = true;
    } else {
      this.setToken(token);
      this.isAuthenticated = true;
    }
  }

  public logIn(payload: LoginContext): Observable<LoginResponse> {
    const passwordHash = CryptoUtils.calculatePasswordHash(payload.email, payload.password);

    return this.http.post<LoginResponse>(this.API_ENDPOINTS.login, {email: payload.email, password: passwordHash});
  }

  public logOut(): Observable<any> {
    return this.http.post(this.API_ENDPOINTS.logout, {});
  }

  public signUp(payload: SignupContext): Observable<SignupResponse> {
    const passwordHash = CryptoUtils.calculatePasswordHash(payload.email, payload.password);

    return this.http.post<SignupSuccessResponse>(this.API_ENDPOINTS.signup, {
      username: payload.username,
      email: payload.email,
      password: passwordHash,
      captcha: payload.captcha
    });
  }

  public setWallet(payload: SetWalletContext): Observable<string> {
    return this.http.post<string>(this.API_ENDPOINTS.setWallet, payload.mnemonicEncrypted);
  }

  public getEmails(): Observable<string[]> {
    return this.http.get<string[]>(this.API_ENDPOINTS.getEmails);
  }

  public resetPassword(payload: ResetPasswordContext): Observable<string> {
    return this.http.post<string>(this.API_ENDPOINTS.resetPassword, { username: payload.email });
  }

  public changePassword(payload: ChangePasswordContext): Observable<string> {
    return this.http.post<string>(this.API_ENDPOINTS.changePassword, payload);
  }

  public checkPassword(payload: CheckPasswordContext): Observable<CheckPasswordResponse> {
    return this.http.post<CheckPasswordResponse>(this.API_ENDPOINTS.checkPassword, payload);
  }

  public getStatus(): Observable<User> {
    return this.http.get<User>(this.API_ENDPOINTS.status);
  }
}
