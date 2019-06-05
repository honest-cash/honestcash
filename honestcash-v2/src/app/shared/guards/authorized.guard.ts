import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {Logger} from '../services/logger.service';
import {AuthService} from '../services/auth.service';
import {isPlatformBrowser} from '@angular/common';

const log = new Logger('AuthorizedGuard');

@Injectable({providedIn: 'root'})
export class AuthorizedGuard implements CanActivate {
  private isPlatformBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
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
    // during SSR, as localStorage is undefined and thus the user is not authenticated, it will always redirect user to login
    // which will cause login page to appear until client rendering takes over
    // by then localStorage is defined and if the user exists, user will see the correct route
    return true;

  }
}
