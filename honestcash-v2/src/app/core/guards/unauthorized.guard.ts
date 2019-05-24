import {Inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {Logger} from '../services/logger.service';
import {AuthService} from '../services/auth.service';
import {WindowToken} from '../helpers/window';
import {EnvironmentToken} from '../helpers/environment';
import {Environment} from '../../../environments/environment';

const log = new Logger('UnauthorizedGuard');

@Injectable({providedIn: 'root'})
export class UnauthorizedGuard implements CanActivate {
  constructor(
    @Inject(WindowToken) private window: Window,
    @Inject(EnvironmentToken) private environment: Environment,
    private router: Router,
    private authenticationService: AuthService
  ) {
  }

  canActivate(): boolean {
    if (!this.authenticationService.hasAuthorization()) {
      return true;
    }

    // @ todo change when feed is introduced
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
}
