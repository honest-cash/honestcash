import {Observable, of} from 'rxjs';
import {
  CheckPasswordContext,
  CheckPasswordResponse,
  EmptyResponse,
  FailedResponse,
  LoginContext,
  LoginResponse,
  LoginSuccessResponse,
  OkResponse,
  ResetPasswordContext,
  ResetPasswordRequestContext,
  SignupContext,
  SignupResponse,
  SignupSuccessResponse
} from '../models/authentication';
import User from '../../user/models/user';
import {ISimpleWallet, SimpleWallet} from '../../wallet/models/simple-wallet';
import {WalletService} from '../../wallet/services/wallet.service';

export class MockAuthenticationService {

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
        wallet: new SimpleWallet(),
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
      return WalletService.calculatePasswordHash(this.email, this.password);
    }
  };
  public isAuthenticated = false;
  public token = '';


  public logIn(payload: LoginContext): Observable<LoginResponse> {
    // check if correct and return success
    if (payload.email === this.mocks.email && payload.password === this.mocks.password) {
      return of(this.mocks.loginSuccess);
    }
    return of(this.mocks.loginFailure);
  }

  public logOut(): Observable<EmptyResponse> {
    return of({});
  }

  public signUp(payload: SignupContext): Observable<SignupResponse> {
    // check if correct and return succes
    if (payload.username === this.mocks.username) {
      return of(this.mocks.signupSuccess);
    }
    return of(this.mocks.signupFailure);
  }

  public setWallet(wallet: ISimpleWallet): Observable<OkResponse> {
    return of({ok: true});
  }

  public getEmails(): Observable<string[]> {
    return of([
      'toto@toto.com'
    ]);
  }

  public resetPassword(payload: ResetPasswordRequestContext): Observable<EmptyResponse> {
    return of({});
  }

  public changePassword(payload: ResetPasswordContext): Observable<OkResponse> {
    return of({ok: true});
  }

  public checkPassword(payload: CheckPasswordContext): Observable<CheckPasswordResponse> {
    return of({isValid: true});
  }

  public getStatus(): Observable<User> {
    return of(new User());
  }

}
