import { Injectable } from '@angular/core';
import { Observable, of, defer } from 'rxjs';
import User from '../models/user';
import { CryptoUtils } from '../../shared/lib/CryptoUtils';
import { HttpService } from '..';
import {
  ChangePasswordContext,
  CheckPasswordContext,
  CheckPasswordResponse,
  EmptyResponse,
  LoginContext,
  LoginResponse,
  OkResponse,
  ResetPasswordRequestContext,
  SetWalletContext,
  SignupContext,
  SignupResponse,
  SignupSuccessResponse
} from '../models/authentication';
import { WalletUtils } from 'app/shared/lib/WalletUtils';
import { mergeMap } from 'rxjs/operators';
import {environment} from '../../../environments/environment';

export const LOCAL_TOKEN_KEY = 'HC_USER_TOKEN';

/**
 * This function exists only for SSR because the SSR server does not support localStorage.
 */
const getLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage;
  }

  return {
    setItem: (_key: string, _value: string) => void 0,
    getItem: (_key: string) => void 0,
    removeItem: (_key: string) => void 0
  };
};

// @todo refactor
interface ChangePasswordPayload extends ChangePasswordContext {
  mnemonicEncrypted: string;
}

export const API_ENDPOINTS = {
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

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token = '';
  private userId: number;
  private isAuthenticated = false;

  constructor(
    private http: HttpService
  ) {}

  public getToken(): string {
    let token;
    if (!this.token && (token = getLocalStorage().getItem(LOCAL_TOKEN_KEY))) {
      this.token = token;
    }
    return this.token;
  }

  public setToken(token: string) {
    this.token = token;
    getLocalStorage().setItem(LOCAL_TOKEN_KEY, token);
  }

  // needed for the v1 integration, @todo, review its use after.
  public setUserId(userId: number) {
    this.userId = userId;

    getLocalStorage().setItem('HC_USER_ID', String(userId));
  }

  public unsetToken(): void {
    this.token = '';
    this.isAuthenticated = false;
    getLocalStorage().removeItem(LOCAL_TOKEN_KEY);
  }

  public hasAuthorization(): boolean {
    if (!this.isAuthenticated && this.getToken()) {
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }

  public init(token?: string, userId?: number) {
    if (!token && this.getToken()) {
      this.isAuthenticated = true;
    } else if (token) {
      this.setToken(token);
      this.setUserId(userId);

      this.isAuthenticated = true;
    }
  }

  public logIn(payload: LoginContext): Observable<LoginResponse> {
    const passwordHash = CryptoUtils.calculatePasswordHash(payload.email, payload.password);

    return this.http.post<LoginResponse>(API_ENDPOINTS.login, {email: payload.email, password: passwordHash});
  }

  public logOut(): Observable<EmptyResponse> {
    return this.http.post(API_ENDPOINTS.logout, {});
  }

  public signUp(payload: SignupContext): Observable<SignupResponse> {
    const passwordHash = CryptoUtils.calculatePasswordHash(payload.email, payload.password);

    return this.http.post<SignupSuccessResponse>(API_ENDPOINTS.signup, {
      username: payload.username,
      email: payload.email,
      password: passwordHash,
      captcha: payload.captcha
    });
  }

  public setWallet(payload: SetWalletContext): Observable<OkResponse> {
    return this.http.post<OkResponse>(API_ENDPOINTS.setWallet, payload.mnemonicEncrypted);
  }

  public getEmails(): Observable<string[]> {
    return this.http.get<string[]>(API_ENDPOINTS.getEmails);
  }

  public resetPassword(payload: ResetPasswordRequestContext): Observable<EmptyResponse> {
    return this.http.post<string>(API_ENDPOINTS.resetPassword, { email: payload.email });
  }

  public changePassword(context: ChangePasswordContext): Observable<OkResponse> {
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

        return this.http.post<OkResponse>(API_ENDPOINTS.changePassword, payload);
        })
      )
    );
  }

  public checkPassword(payload: CheckPasswordContext): Observable<CheckPasswordResponse> {
    // it is not used yet so when it is used complete the following:
    // @todo write tests
    // @todo hash passwords before sending
    return this.http.post<CheckPasswordResponse>(API_ENDPOINTS.checkPassword, payload);
  }

  public getStatus(): Observable<User> {
    return this.http.get<User>(API_ENDPOINTS.status);
  }
}
