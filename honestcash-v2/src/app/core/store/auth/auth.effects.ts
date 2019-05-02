import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import User from '../../../models/user';
import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
  SignUp, SignUpSuccess, SignUpFailure,
  ResetPassword, ResetPasswordSuccess, ResetPasswordFailure,
  LogOut,
} from './auth.actions';
import { WalletSetup, WalletCleanup } from '../wallet/wallet.actions';
import { UserSetup, UserCleanup } from '../user/user.actions';
import {AuthenticationService} from '../../services/authentication.service';
import {
  LoginContext,
  LoginResponse,
  ResetPasswordContext, ResetPasswordResponse,
  SignupContext,
  SignupResponse
} from '../../services/authentication.interfaces';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap((payload: LoginContext) =>
      // @todo: refactor to encode with a password hash
      this.authenticationService.logIn(payload)
      .pipe(
        map((logInResponse: LoginResponse) => new LogInSuccess({...logInResponse, password: payload.password})),
        catchError((error) => of(new LogInFailure(error))),
      )
    )
  );

  @Effect()
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    map((action: LogInSuccess) => action.payload),
    switchMap((payload: LoginResponse) => [ new UserSetup(payload), new WalletSetup(payload) ]),
    tap(() => this.router.navigateByUrl('/thank-you'))
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap((payload: SignupContext) =>
    // @todo: refactor to encode with a password hash
      this.authenticationService.signUp(payload)
      .pipe(
        map((signUpResponse: SignupResponse) => new SignUpSuccess({...signUpResponse, password: payload.password})),
        catchError((error) => of(new SignUpFailure(error))),
      )
    )
  );

  @Effect()
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    map((action: SignUpSuccess) => action.payload),
    switchMap((payload: SignupResponse) => [ new UserSetup(payload), new WalletSetup(payload) ]),
    tap(() => this.router.navigateByUrl('/thank-you'))
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE),
  );

  @Effect()
  ResetPassword: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.RESET_PASSWORD),
    map((action: ResetPassword) => action.payload),
    switchMap((payload: ResetPasswordContext) =>
      this.authenticationService.resetPassword(payload)
      .pipe(
        map(() => new ResetPasswordSuccess()),
        catchError((error) => of(new ResetPasswordFailure(error)))
      ))
  );

  @Effect()
  ResetPasswordSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.RESET_PASSWORD_SUCCESS),
    tap(() => this.router.navigateByUrl('/reset-password/verify'))
  );

  @Effect({ dispatch: false })
  ResetPasswordFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.RESET_PASSWORD_FAILURE)
  );

  @Effect()
  LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    switchMap(() => [ new UserCleanup(), new WalletCleanup() ]),
    tap(() => {
      this.authenticationService.logOut().subscribe(() => {
        this.router.navigateByUrl('/');
      });
    })
  );

  @Effect({ dispatch: false })
  GetStatus: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.GET_STATUS),
    switchMap(payload => {
      return this.authenticationService.getStatus();
    })
  );

}
