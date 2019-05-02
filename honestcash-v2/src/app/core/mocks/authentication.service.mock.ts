import { Observable, of } from 'rxjs';

import {LoginContext, LoginResponse} from '../services/authentication.interfaces';
import User from '../../models/user';
import Wallet from '../../models/wallet';

export class MockAuthenticationService {
  isAuthenticated = false;
  token: string = null;

  login(context: LoginContext): Observable<LoginResponse> {
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
