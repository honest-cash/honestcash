import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {Logger} from '../services/logger.service';
import {AuthService} from '../../../app/auth/services/auth.service';
import {WalletService} from '../../../app/wallet/services/wallet.service';
import {WindowToken} from '../helpers/window.helper';
import {EnvironmentToken} from '../helpers/environment.helper';
import {Environment} from '../../../environments/environment';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';
import {WALLET_STATUS} from '../../../app/wallet/models/status';

const log = new Logger('VersionOneGuard');

@Injectable({providedIn: 'root'})
export class VersionOneGuard implements CanActivate {
  private readonly isPlatformBrowser: boolean;
  private readonly isPlatformServer: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(WindowToken) private window: Window,
    @Inject(EnvironmentToken) public environment: Environment,
    private router: Router,
    private authenticationService: AuthService,
    private walletService: WalletService,
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
    this.isPlatformServer = isPlatformServer(this.platformId);
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
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
    if (this.isPlatformServer) {
      // during SSR, as localStorage is undefined and thus the user is not authenticated, it will always redirect user to login
      // which will cause login page to appear until client rendering takes over
      // by then localStorage is defined and if the user exists, user will see the correct route
      /* istanbul ignore next*/
      return true;
    }
  }

}
