import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, first, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {
  AuthActionTypes,
  AuthSetup,
  LogIn,
  LogInFailure,
  LogInSuccess,
  ResetPassword,
  ResetPasswordFailure,
  ResetPasswordRequest,
  ResetPasswordRequestFailure,
  ResetPasswordRequestSuccess,
  ResetPasswordSuccess,
  RootRedirect,
  SignUp,
  SignUpFailure,
  SignUpSuccess,
} from './auth.actions';
import {WalletActionTypes, WalletCleanup, WalletSetup} from '../wallet/wallet.actions';
import {UserActionTypes, UserCleanup, UserSetup} from '../user/user.actions';
import {AuthService} from '../../shared/services/auth.service';
import {
  LoginContext,
  LoginSuccessResponse,
  ResetPasswordContext,
  ResetPasswordRequestContext,
  SignupContext,
  SignupSuccessResponse
} from '../../shared/models/authentication';
import {UserService} from 'app/shared/services/user.service';
import {WalletService} from 'app/shared/services/wallet.service';
import {WindowToken} from '../../core/helpers/window';
import {Store} from '@ngrx/store';
import {AppStates} from '../../app.states';

@Injectable()
export class AuthEffects {

  constructor(
    @Inject(WindowToken) private window: Window,
    private store: Store<AppStates>,
    private actions: Actions,
    private authService: AuthService,
    private walletService: WalletService,
    private userService: UserService,
    private router: Router,
  ) {
  }

  @Effect()
  public LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap((payload: LoginContext) =>
      // @todo: refactor to encode with a password hash
      this.authService.logIn(payload)
      .pipe(
        map((logInResponse: LoginSuccessResponse) => new LogInSuccess({...logInResponse, password: payload.password})),
        catchError((error) => of(new LogInFailure(error))),
      )
    )
  );

  @Effect()
  public LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    map((action: LogInSuccess) => action.payload),
    mergeMap((payload) => {
      const firstActionSuccess$ = this.actions.pipe(
        ofType(UserActionTypes.USER_LOADED),
        first(),
      );

      const secondActionsSuccess$ = this.actions.pipe(
        ofType(WalletActionTypes.WALLET_GENERATED),
        first(),
      );

      const success$ = forkJoin(firstActionSuccess$, secondActionsSuccess$)
      .pipe(first())
      .subscribe(() => {
        this.store.dispatch(new RootRedirect());
      });

      return [
        new UserSetup(payload),
        new WalletSetup(payload),
        new AuthSetup(),
      ];
    }),
  );

  @Effect()
  public SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap((payload: SignupContext) =>
      // @todo: refactor to encode with a password hash
      this.authService.signUp(payload)
      .pipe(
        map((signUpResponse: SignupSuccessResponse) => new SignUpSuccess({...signUpResponse, password: payload.password})),
        catchError((error) => of(new SignUpFailure(error))),
      )
    )
  );

  @Effect()
  public SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    map((action: SignUpSuccess) => action.payload),
    tap(() => this.router.navigateByUrl('/thank-you'))
  );

  @Effect()
  public ResetPassword: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.RESET_PASSWORD),
    map((action: ResetPassword) => action.payload),
    switchMap((payload: ResetPasswordContext) =>
      this.authService.changePassword(payload)
      .pipe(
        map(() => new ResetPasswordSuccess()),
        catchError((error) => of(new ResetPasswordFailure(error)))
      ))
  );

  @Effect()
  public ResetPasswordRequest: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.RESET_PASSWORD_REQUEST),
    map((action: ResetPasswordRequest) => action.payload),
    switchMap((payload: ResetPasswordRequestContext) =>
      this.authService.resetPassword(payload)
      .pipe(
        map(() => new ResetPasswordRequestSuccess()),
        catchError((error) => of(new ResetPasswordRequestFailure(error)))
      ))
  );

  @Effect()
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => this.authService.logOut()),
    switchMap(() => [new UserCleanup(), new WalletCleanup(), new RootRedirect()]),
  );

  @Effect({dispatch: false})
  public AuthSetup: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.AUTH_SETUP),
    tap(() => this.authService.authenticate()),
  );

  @Effect({dispatch: false})
  public RootRedirect: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.ROOT_REDIRECT),
    tap(() => {
      this.router.navigateByUrl('/');
    }),
  );
}
