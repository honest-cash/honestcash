import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';

import { AuthService, IAuthRequest, IAuthRequestSuccessResponse, } from '../../core/services/auth.service';
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

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap((payload: IAuthRequest) =>
      this.authService.logIn(payload)
      .pipe(
        map((logInResponse: IAuthRequestSuccessResponse) => new LogInSuccess({...logInResponse, password: payload.password})),
        catchError((error) => of(new LogInFailure(error))),
      )
    )
  );

  @Effect()
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    map((action: LogInSuccess) => action.payload),
    switchMap((payload: IAuthRequestSuccessResponse) => {
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
    switchMap((payload: IAuthRequest) =>
      this.authService.signUp(payload)
      .pipe(
        map((signUpResponse: IAuthRequestSuccessResponse) => new SignUpSuccess({...signUpResponse, password: payload.password})),
        catchError((error) => of(new SignUpFailure(error))),
      )
    )
  );

  @Effect()
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    map((action: SignUpSuccess) => action.payload),
    switchMap((payload: IAuthRequestSuccessResponse) => {
      this.router.navigateByUrl('/');

      return [
        new UserSetup(payload),
        new WalletSetup(payload),
      ];
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE),
    switchMap((response) => [])
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
