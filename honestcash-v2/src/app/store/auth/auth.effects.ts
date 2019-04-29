import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, pipe } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';

import { AuthService, ILogInSuccessResponse, ILogInFailedResponse } from '../../services/auth.service';
import User from '../../models/user';
import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
  ChangePasswordAndWallet,
  SignUp, SignUpSuccess, SignUpFailure,
  ForgotPassword, ForgotPasswordSuccess, ForgotPasswordFailure,
  LogOut,
} from './auth.actions';
import { WalletSetup, WalletCleanup } from '../wallet/wallet.actions';
import { UserSetup, UserCleanup } from '../user/user.actions';

@Injectable()
export class AuthEffects {
  private LOCAL_TOKEN_KEY = 'HC_USER_TOKEN';

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap(payload =>
      this.authService.logIn(payload.email, payload.password)
      .pipe(
        map((logInResponse: ILogInSuccessResponse) => new LogInSuccess(logInResponse)),
        catchError((error) => of(new LogInFailure(error))),
      )
    )
  );

  @Effect()
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    map((action: LogInSuccess) => action.payload),
    switchMap((payload: ILogInSuccessResponse) => {
      this.router.navigateByUrl('/');

      return [
        new UserSetup(payload),
        new WalletSetup(payload),
      ];
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
    switchMap((response) => [])
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap(payload => {
      return this.authService.signUp(payload)
      .pipe(
        map((user: User) => {
          return new SignUpSuccess({token: user.token, email: payload.email});
        }),
        catchError((error) => {
          return of(new SignUpFailure({ error: error }));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user) => {
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );

  @Effect()
  ForgotPassword: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.FORGOT_PASSWORD),
    map((action: ForgotPassword) => action.payload),
    switchMap(payload => {
      return this.authService.resetPassword(payload.email)
      .pipe(
        map((user: User) => {
          return new ForgotPasswordSuccess({token: user.token, email: payload.email});
        }),
        catchError((error) => {
          return of(new ForgotPasswordFailure({ error: error }));
        })
      );
    })
  );

  @Effect()
  ChangePasswordAndWallet: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.FORGOT_PASSWORD),
    map((action: ChangePasswordAndWallet) => action.payload),
    switchMap(payload => {
      return this.authService.resetPassword(payload.email)
      .pipe(
        map((user: User) => {
          return new ForgotPasswordSuccess({token: user.token, email: payload.email});
        }),
        catchError((error) => {
          return of(new ForgotPasswordFailure({ error: error }));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  ForgotPasswordSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.FORGOT_PASSWORD_SUCCESS),
    tap(() => {
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  ForgotPasswordFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.FORGOT_PASSWORD_FAILURE)
  );

  @Effect({ dispatch: false })
  LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    switchMap(() => {
      this.router.navigateByUrl('/');

      return [
        new UserCleanup(),
        new WalletCleanup(),
      ];
    })
  );

  @Effect({ dispatch: false })
  GetStatus: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.GET_STATUS),
    switchMap(payload => {
      return this.authService.getStatus();
    })
  );

}
