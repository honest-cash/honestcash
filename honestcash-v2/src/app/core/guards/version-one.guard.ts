import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {Logger} from '../services/logger.service';
import {AuthenticationService} from '../services/authentication.service';
import {WalletService} from '../services/wallet.service';
import {WindowToken} from '../helpers/window';
import {EnvironmentToken} from '../helpers/environment';
import {Environment} from '../../../environments/environment';

const log = new Logger('AuthorizedGuard');

@Injectable({providedIn: 'root'})
export class VersionOneGuard implements CanActivate {
  constructor(
    @Inject(WindowToken) private window: Window,
    @Inject(EnvironmentToken) private environment: Environment,
    private router: Router,
    private authenticationService: AuthenticationService,
    private walletService: WalletService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authenticationService.hasAuthorization() && this.walletService.getWalletMnemonic()) {
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

}
