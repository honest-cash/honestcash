import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {defer, Observable} from 'rxjs';
import {
  ChangePasswordPayload,
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
import {UserService} from '../../user/services/user.service';
import {API_ENDPOINTS} from '../shared/auth.endpoints';
import {HttpService} from '../../../core/http/http.service';
import {AuthSharedModule} from '../auth-shared.module';

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
    private userService: UserService,
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
  }

  public unauthenticate(): void {
    this.isAuthenticated = false;
  }

  public authenticate() {
    if (this.isPlatformBrowser && this.walletService.getWalletMnemonic() && this.userService.getToken()) {
      this.isAuthenticated = true;
    }
  }

  public hasAuthorization(): boolean {
    // this function is used throughout the app
    // to determine whether a user is logged in
    // if the token exists via this instance or via localStorage
    // the user is considered as authenticated
    if (this.isPlatformBrowser) {
      if (!this.isAuthenticated && this.walletService.getWalletMnemonic() && this.userService.getToken()) {
        this.isAuthenticated = true;
      }
    }

    return this.isAuthenticated;
  }

  public logIn(payload: LoginContext): Observable<LoginResponse> {
    const passwordHash = WalletService.calculatePasswordHash(payload.email, payload.password);

    return this.http.post<LoginResponse>(API_ENDPOINTS.login, {email: payload.email, password: passwordHash});
  }

  public logOut(): Observable<EmptyResponse> {
    this.unauthenticate();
    return this.http.post(API_ENDPOINTS.logout, {});
  }

  public signUp(payload: SignupContext): Observable<SignupResponse> {
    const passwordHash = WalletService.calculatePasswordHash(payload.email, payload.password);

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
      const mnemonic = (this.walletService.createWallet(context.newPassword)).mnemonic;
      const mnemonicEncrypted = this.walletService.encryptMnemonic(mnemonic, context.newPassword);
      const payload: ChangePasswordPayload = {
        email: context.email,
        code: context.code,
        newPassword: WalletService.calculatePasswordHash(context.email, context.newPassword),
        repeatNewPassword: WalletService.calculatePasswordHash(context.email, context.repeatNewPassword),
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
