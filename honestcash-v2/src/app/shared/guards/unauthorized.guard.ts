import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {Logger} from '../services/logger.service';
import {AuthService} from '../services/auth.service';
import {WindowToken} from '../../core/helpers/window';
import {EnvironmentToken} from '../../core/helpers/environment';
import {Environment} from '../../../environments/environment';
import {isPlatformBrowser} from '@angular/common';

const log = new Logger('UnauthorizedGuard');

@Injectable({providedIn: 'root'})
export class UnauthorizedGuard implements CanActivate {
  private isPlatformBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(WindowToken) private window: Window,
    @Inject(EnvironmentToken) private environment: Environment,
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
  }

  canActivate(): boolean {
    if (this.isPlatformBrowser) {
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
    // to cheat SSR until client takes over
    return true;
  }
}
