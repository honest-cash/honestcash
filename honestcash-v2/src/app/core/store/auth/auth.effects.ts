import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {defer, Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {
  AuthActionTypes,
  LogIn,
  LogInFailure,
  LogInSuccess,
  ResetPassword,
  ResetPasswordFailure,
  ResetPasswordRequest,
  ResetPasswordRequestFailure,
  ResetPasswordRequestSuccess,
  ResetPasswordSuccess,
  SignUp,
  SignUpFailure,
  SignUpSuccess,
} from './auth.actions';
import {WalletCleanup, WalletSetup} from '../wallet/wallet.actions';
import {UserCleanup, UserSetup} from '../user/user.actions';
import {AuthenticationService} from '../../services/authentication.service';
import {
  LoginContext,
  LoginSuccessResponse,
  ResetPasswordContext,
  ResetPasswordRequestContext,
  SignupContext,
  SignupSuccessResponse
} from '../../models/authentication';
import {UserService} from 'app/core/services/user.service';
import {WalletService} from 'app/core/services/wallet.service';
import {ISimpleBitcoinWallet, WalletUtils} from 'app/shared/lib/WalletUtils';
import {Logger} from 'app/core/services/logger.service';

@Injectable()
export class AuthEffects {
  private logger: Logger;

  constructor(
    private actions: Actions,
    private authenticationService: AuthenticationService,
    private walletService: WalletService,
    private userService: UserService,
    private router: Router,
  ) {
    this.logger = new Logger('AuthEffects');
  }

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap((payload: LoginContext) =>
      // @todo: refactor to encode with a password hash
      this.authenticationService.logIn(payload)
      .pipe(
        map((logInResponse: LoginSuccessResponse) => new LogInSuccess({...logInResponse, password: payload.password})),
        catchError((error) => of(new LogInFailure(error))),
      )
    )
  );

  @Effect()
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    map((action: LogInSuccess) => action.payload),
    tap((payload) => {
      this.authenticationService.init(payload.token, payload.user.id);
    }),
    // this generates a new wallet
    // @todo refactor it together with wallet.effects as the functionality is mixed together.
    mergeMap((payload: LoginSuccessResponse) => defer(async () => {
      let simpleWallet: ISimpleBitcoinWallet;

      if (!payload.wallet || !payload.wallet.mnemonicEncrypted) {
        this.logger.info('Creating new wallet.');

        simpleWallet = await WalletUtils.generateNewWallet(payload.password);

        await this.walletService.setWallet(simpleWallet.mnemonic);
      }

      const mnemonicEncrypted = simpleWallet ? simpleWallet.mnemonicEncrypted : payload.wallet.mnemonicEncrypted;

      return <LoginSuccessResponse>{
        user: payload.user,
        password: payload.password,
        token: payload.token,
        wallet: {
          mnemonicEncrypted
        }
      };
    })),
    switchMap((payload: LoginSuccessResponse) => [
      new UserSetup(),
      new WalletSetup({mnemonic: payload.wallet.mnemonicEncrypted, password: payload.password})
    ]),
    tap(() => {
      // @todo
      this.tryGoToMainPageAfterLogin();
      // this.router.navigateByUrl('/thank-you');
    })
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap((payload: SignupContext) =>
      // @todo: refactor to encode with a password hash
      this.authenticationService.signUp(payload)
      .pipe(
        map((signUpResponse: SignupSuccessResponse) => new SignUpSuccess({...signUpResponse, password: payload.password})),
        catchError((error) => of(new SignUpFailure(error))),
      )
    )
  );

  @Effect()
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    map((action: SignUpSuccess) => action.payload),
    tap((payload: SignupSuccessResponse) => this.authenticationService.init(payload.token, payload.user.id)),
    switchMap(payload => of(new UserSetup())),
    tap(() => this.router.navigateByUrl('/thank-you'))
  );

  @Effect()
  ResetPassword: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.RESET_PASSWORD),
    map((action: ResetPassword) => action.payload),
    switchMap((payload: ResetPasswordContext) =>
      this.authenticationService.changePassword(payload)
      .pipe(
        map(() => new ResetPasswordSuccess()),
        catchError((error) => of(new ResetPasswordFailure(error)))
      ))
  );

  @Effect()
  ResetPasswordRequest: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.RESET_PASSWORD_REQUEST),
    map((action: ResetPasswordRequest) => action.payload),
    switchMap((payload: ResetPasswordRequestContext) =>
      this.authenticationService.resetPassword(payload)
      .pipe(
        map(() => new ResetPasswordRequestSuccess()),
        catchError((error) => of(new ResetPasswordRequestFailure(error)))
      ))
  );

  @Effect()
  LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    switchMap(() => [new UserCleanup(), new WalletCleanup()]),
    tap(() => {
      this.authenticationService.logOut().subscribe(() => {
        this.router.navigateByUrl('/');
      });
    })
  );

  @Effect({dispatch: false})
  GetStatus: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.GET_STATUS),
    switchMap(payload => {
      return this.authenticationService.getStatus();
    })
  );

  @Effect({dispatch: false})
  AuthCleanup: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.AUTH_CLEANUP),
    tap(() => {
      return this.authenticationService.unsetToken();
    })
  );

  /**
   * Recursive function trying to switch to the main page.
   * We check if the token and wallet mnemonic have been initialized and then forward to main page after login.
   * @todo: replace with with a more cleaner approach.
   */
  private tryGoToMainPageAfterLogin() {
    if (this.authenticationService.getToken() && this.walletService.getWalletMnemonic()) {
      // this.router.navigateByUrl('/thank-you');
      // @todo: hard reload to go to V1
      location.href = '/';
    } else {
      setTimeout(() => {
        this.tryGoToMainPageAfterLogin();
      }, 1000);
    }
  }
}
