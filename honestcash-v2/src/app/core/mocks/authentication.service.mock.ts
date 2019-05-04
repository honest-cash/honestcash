import { Observable, of } from 'rxjs';

import {LoginContext, LoginSuccessResponse} from '../models/authentication';
import User from '../models/user';
import Wallet from '../models/wallet';

export class MockAuthenticationService {
  isAuthenticated = false;
  token: string = null;

  login(context: LoginContext): Observable<LoginSuccessResponse> {
    return of({
      user: new User(),
      wallet: new Wallet(),
      token: '123456',
    });
  }

  logout(): Observable<boolean> {
    return of(true);
  }

}
