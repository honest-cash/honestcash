import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {Logger} from '../services/logger.service';
import {AuthService} from '../../../app/auth/services/auth.service';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';

const log = new Logger('AuthorizedGuard');

@Injectable({providedIn: 'root'})
export class AuthorizedGuard implements CanActivate {
  readonly isPlatformBrowser: boolean;
  readonly isPlatformServer: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
    this.isPlatformServer = isPlatformServer(this.platformId);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isPlatformBrowser) {
      if (this.authenticationService.hasAuthorization()) {
        return true;
      }

      log.debug('Unauthorized, redirecting to login page...');
      this.router.navigate(['/login'], {queryParams: {redirect: state.url}, replaceUrl: true});
      return false;
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
