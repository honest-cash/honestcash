import { Observable, of } from 'rxjs';

import {
  ChangePasswordContext, CheckPasswordContext, CheckPasswordResponse, FailedResponse,
  LoginContext,
  LoginResponse,
  LoginSuccessResponse, ResetPasswordRequestContext, SetWalletContext,
  SignupContext,
  SignupResponse,
  SignupSuccessResponse
} from '../models/authentication';
import User from '../models/user';
import Wallet from '../models/wallet';
import {CryptoUtils} from '../../shared/lib/CryptoUtils';
import {AuthenticationService, LOCAL_TOKEN_KEY} from '../services/authentication.service';
import {HttpService} from '..';

export class MockAuthenticationService {

  public API_ENDPOINTS = this.authenticationService.API_ENDPOINTS;

  public mocks = {
    token: '123',
    username: 'toto',
    email: 'toto@toto.com',
    password: '123',
    captcha: 'asdf',
    get loginContext(): LoginContext {
      return {
        email: this.email,
        password: this.password,
      };
    },
    get loginSuccess(): LoginSuccessResponse {
      return {
        user: new User(),
        wallet: new Wallet(),
        token: '123',
      };
    },
    get loginFailure(): FailedResponse {
      return {
        code: 400,
        // PASSWORD_INCORRECT is just an example of failure.
        // we have no tests for each case.
        // if we did that would mean we are kind of testing the backend
        desc: 'PASSWORD_INCORRECT',
        httpCode: 4000,
      };
    },
    get signupContext() {
      return {
        email: this.email,
        username: this.username,
        password: this.password,
        captcha: this.captcha,
      };
    },
    get signupSuccess(): SignupSuccessResponse {
      return {
        user: new User(),
        token: '123',
      };
    },
    get signupFailure(): FailedResponse {
      return {
        code: 400,
        // PASSWORD_INCORRECT is just an example of failure.
        // we have no tests for each case.
        // if we did that would mean we are kind of testing the backend
        desc: 'USER_ALREADY_TAKEN',
        httpCode: 4000,
      };
    },
    get hashedPassword() {
      return CryptoUtils.calculatePasswordHash(this.email, this.password);
    }
  };
  private isAuthenticated = false;
  private token: string = null;

  constructor(
    private authenticationService: AuthenticationService,
  ) {}

  public getToken(): string {
    return this.authenticationService.getToken();
  }

  public setToken(token: string) {
    return this.authenticationService.setToken(token);
  }

  public unsetToken(): void {
    return this.authenticationService.unsetToken();
  }

  public hasAuthorization(): boolean {
    return this.authenticationService.hasAuthorization();
  }

  public init(token?: string) {
    return this.authenticationService.init(token);
  }

  public logIn(payload: LoginContext): Observable<LoginResponse> {
    // trigger request for mock to catch
    this.authenticationService.logIn(payload).subscribe(() => {});
    // check if correct and return succes
    if (payload.email === this.mocks.email && payload.password === this.mocks.password) {
      return of(this.mocks.loginSuccess);
    }
    return of (this.mocks.loginFailure);
  }

  public logOut(): Observable<any> {
    return this.authenticationService.logOut();
  }

  public signUp(payload: SignupContext): Observable<SignupResponse> {
    // trigger request for mock to catch
    this.authenticationService.signUp(payload).subscribe(() => {});
    // check if correct and return succes
    if (payload.username === this.mocks.username) {
      return of(this.mocks.signupSuccess);
    }
    return of (this.mocks.signupFailure);
  }

  public setWallet(payload: SetWalletContext): Observable<string> {
    //return this.http.post<string>(this.API_ENDPOINTS.setWallet, payload.mnemonicEncrypted);
  }

  public getEmails(): Observable<string[]> {
    //return this.http.get<string[]>(this.API_ENDPOINTS.getEmails);
  }

  public resetPassword(payload: ResetPasswordRequestContext): Observable<string> {
    //return this.http.post<string>(this.API_ENDPOINTS.resetPassword, { email: payload.email });
  }

  public changePassword(payload: ChangePasswordContext): Observable<string> {
    //return this.http.post<string>(this.API_ENDPOINTS.changePassword, payload);
  }

  public checkPassword(payload: CheckPasswordContext): Observable<CheckPasswordResponse> {
    //return this.http.post<CheckPasswordResponse>(this.API_ENDPOINTS.checkPassword, payload);
  }

  public getStatus(): Observable<User> {
    //return this.http.get<User>(this.API_ENDPOINTS.status);
  }

}
