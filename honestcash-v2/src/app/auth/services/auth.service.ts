import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {defer, Observable} from 'rxjs';
import {HttpService} from '../../../core';
import {
  CheckPasswordContext,
  CheckPasswordResponse,
  EmptyResponse,
  LoginContext,
  LoginResponse,
  OkResponse,
  ResetPasswordContext,
  ResetPasswordRequestContext,
  SignupContext,
  SignupResponse,
  SignupSuccessResponse
} from '../models/authentication';
import {isPlatformBrowser} from '@angular/common';
import {LocalStorageToken} from '../../../core/shared/helpers/local-storage.helper';
import {Store} from '@ngrx/store';
import {AppStates} from '../../app.states';
import {WalletService} from '../../wallet/services/wallet.service';

export const LOCAL_TOKEN_KEY = 'HC_USER_TOKEN';
export const LOCAL_USER_ID_KEY = 'HC_USER_ID';

// @todo refactor
interface ChangePasswordPayload extends ResetPasswordContext {
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
export class AuthService {


  private isAuthenticated = false;
  private readonly isPlatformBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private store: Store<AppStates>,
    private http: HttpService,
    private walletService: WalletService,
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
  }

  public unauthenticate(): void {
    this.isAuthenticated = false;
  }

  public authenticate() {
    this.isAuthenticated = true;
  }

  public hasAuthorization(): boolean {
    return this.isAuthenticated;
  }

  public logIn(payload: LoginContext): Observable<LoginResponse> {
    const passwordHash = this.walletService.calculatePasswordHash(payload.email, payload.password);

    return this.http.post<LoginResponse>(API_ENDPOINTS.login, {email: payload.email, password: passwordHash});
  }

  public logOut(): Observable<EmptyResponse> {
    this.unauthenticate();
    return this.http.post(API_ENDPOINTS.logout, {});
  }

  public signUp(payload: SignupContext): Observable<SignupResponse> {
    const passwordHash = this.walletService.calculatePasswordHash(payload.email, payload.password);

    return this.http.post<SignupSuccessResponse>(API_ENDPOINTS.signup, {
      username: payload.username,
      email: payload.email,
      password: passwordHash,
      captcha: payload.captcha
    });
  }

  public getEmails(): Observable<string[]> {
    return this.http.get<string[]>(API_ENDPOINTS.getEmails);
  }

  public resetPassword(payload: ResetPasswordRequestContext): Observable<EmptyResponse> {
    return this.http.post<string>(API_ENDPOINTS.resetPassword, {email: payload.email});
  }

  public changePassword(context: ResetPasswordContext): Observable<OkResponse> {
    return defer(async () => {
      const mnemonic = (await this.walletService.generateNewWallet(context.newPassword)).mnemonic;
      const mnemonicEncrypted = await this.walletService.encrypt(mnemonic, context.newPassword);
      const payload: ChangePasswordPayload = {
        email: context.email,
        code: context.code,
        newPassword: this.walletService.calculatePasswordHash(context.email, context.newPassword),
        repeatNewPassword: this.walletService.calculatePasswordHash(context.email, context.repeatNewPassword),
        mnemonicEncrypted,
      };

      await this.http.post<OkResponse>(API_ENDPOINTS.changePassword, payload).toPromise();

      return {
        ok: true,
      };
    });
  }

  public checkPassword(payload: CheckPasswordContext): Observable<CheckPasswordResponse> {
    // it is not used yet so when it is used complete the following:
    // @todo hash passwords before sending
    // and add hash tests
    return this.http.post<CheckPasswordResponse>(API_ENDPOINTS.checkPassword, payload);
  }
}
