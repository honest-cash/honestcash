import { Observable, of } from 'rxjs';

import {LoginContext, LoginSuccessResponse} from '../models/authentication';
import User from '../models/user';
import Wallet from '../models/wallet';

export class MockAuthenticationService {
  isAuthenticated = false;
  private token: string = null;

  public login(context: LoginContext): Observable<LoginSuccessResponse> {
    return of({
      user: new User(),
      wallet: new Wallet(),
      token: '123456',
    });
  }

  public setToken(token: string) {
    this.token = token;
  }

  public unsetToken() {
    delete this.token;
  }

  public getToken() {
    return this.token;
  }

  public logout(): Observable<boolean> {
    return of(true);
  }
}
