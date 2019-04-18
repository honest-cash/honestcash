import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';

import { AuthService } from '@services/auth.service';
import User from '@models/user';
import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
  ChangePasswordAndWallet,
  SignUp, SignUpSuccess, SignUpFailure,
  ForgotPassword, ForgotPasswordSuccess, ForgotPasswordFailure,
  LogOut,
} from './auth.actions';

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
    switchMap(payload => {
      return this.authService.logIn(payload.email, payload.password)
      // side effect & setting up the wallet
      .pipe(
        map((logInResponse: any) => {
          return new LogInSuccess({
            // @todo: refactor to encode with a password hash
            password: payload.password,

            token: logInResponse.token,
            user: logInResponse.user,
            wallet: logInResponse.wallet,
            email: payload.email
          });
        }),
        catchError((error) => {
          return of(new LogInFailure({ error: error }));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem(this.LOCAL_TOKEN_KEY, user.payload.token);

      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
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
      localStorage.setItem(this.LOCAL_TOKEN_KEY, user.payload.token);

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
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
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
    tap((user) => {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/');
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
