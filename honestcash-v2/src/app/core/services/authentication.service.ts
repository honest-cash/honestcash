import { Injectable } from '@angular/core';
import { Observable, of, defer } from 'rxjs';
import User from '../models/user';
import { CryptoUtils } from '../../shared/lib/CryptoUtils';
import { HttpService } from '..';
import {
  ChangePasswordContext, CheckPasswordContext, CheckPasswordResponse, CheckPasswordSuccessResponse,
  FailedResponse,
  LoginContext, LoginResponse,
  LoginSuccessResponse,
  ResetPasswordRequestContext, SetWalletContext,
  SignupContext, SignupResponse, SignupSuccessResponse
} from '../models/authentication';
import { WalletUtils } from 'app/shared/lib/WalletUtils';
import { map, mergeMap } from 'rxjs/operators';
export const LOCAL_TOKEN_KEY = 'HC_USER_TOKEN';

// @todo refactor
interface ChangePasswordPayload extends ChangePasswordContext {
  mnemonicEncrypted: string;
}

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

  public resetPassword(payload: ResetPasswordRequestContext): Observable<string> {
    return this.http.post<string>(this.API_ENDPOINTS.resetPassword, { email: payload.email });
  }

  public changePassword(context: ChangePasswordContext): Observable<string> {
    return defer(async () => {
      const mnemonicEncrypted = (await WalletUtils.generateNewWallet(context.newPassword)).mnemonicEncrypted;

      return mnemonicEncrypted;
    })
    .pipe(
      mergeMap(
        (mnemonicEncrypted => {
          const payload: ChangePasswordPayload = {
            email: context.email,
            code: context.code,
            newPassword: CryptoUtils.calculatePasswordHash(context.email, context.newPassword),
            repeatNewPassword: CryptoUtils.calculatePasswordHash(context.email, context.repeatNewPassword),
            mnemonicEncrypted,
          };

        return this.http.post<string>(this.API_ENDPOINTS.changePassword, payload);
        })
      )
    );
  }

  public checkPassword(payload: CheckPasswordContext): Observable<CheckPasswordResponse> {
    return this.http.post<CheckPasswordResponse>(this.API_ENDPOINTS.checkPassword, payload);
  }

  public getStatus(): Observable<User> {
    return this.http.get<User>(this.API_ENDPOINTS.status);
  }
}
