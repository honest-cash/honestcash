import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {Logger} from '../services/logger.service';
import {AuthService} from '../services/auth.service';
import {WALLET_SETUP_STATUS, WalletService} from '../services/wallet.service';
import {WindowToken} from '../helpers/window';
import {EnvironmentToken} from '../helpers/environment';
import {Environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const log = new Logger('VersionOneGuard');

@Injectable({providedIn: 'root'})
export class VersionOneGuard implements CanActivate {
  constructor(
    @Inject(WindowToken) private window: Window,
    @Inject(EnvironmentToken) private environment: Environment,
    private router: Router,
    private authenticationService: AuthService,
    private walletService: WalletService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authenticationService.hasAuthorization() && this.walletService.getWalletMnemonic()) {
      log.debug('Already logged in, redirecting to v1');
      if (this.environment.production) {
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

  canDeactivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
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

}
