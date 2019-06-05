import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {Logger} from '../services/logger.service';
import {AuthService} from '../services/auth.service';
import {WALLET_SETUP_STATUS, WalletService} from '../services/wallet.service';
import {WindowToken} from '../../core/helpers/window';
import {EnvironmentToken} from '../../core/helpers/environment';
import {Environment} from '../../../environments/environment';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';

const log = new Logger('VersionOneGuard');

@Injectable({providedIn: 'root'})
export class VersionOneGuard implements CanActivate {
  private isPlatformBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(WindowToken) private window: Window,
    @Inject(EnvironmentToken) private environment: Environment,
    private router: Router,
    private authenticationService: AuthService,
    private walletService: WalletService,
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isPlatformBrowser) {
      if (this.authenticationService.hasAuthorization() && this.walletService.getWalletMnemonic()) {
        log.debug('Already logged in, redirecting to v1');
        if (this.environment.env === 'prod' || this.environment.env === 'dev') {
          this.window.location.href = '/';
        } else {
          // or route to v1 port in localhost
          // so that it does not go into endless loop
          // in v2 / all over
          this.window.location.href = 'http://localhost:3010/';
        }
        return false;
      }
      return true;
    }
    // during SSR, as localStorage is undefined and thus the user is not authenticated, it will always redirect user to login
    // which will cause login page to appear until client rendering takes over
    // by then localStorage is defined and if the user exists, user will see the correct route
    return true;
  }

  canDeactivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.isPlatformBrowser) {
      return this.walletService.getWalletSetupStatus()
      .pipe(
        map((status: WALLET_SETUP_STATUS) => {
          if (status === WALLET_SETUP_STATUS.Initialized) {
            return true;
          }
          return false;
        }),
      );
    }
    // to cheat SSR until client takes over
    return of(true);
  }

}
