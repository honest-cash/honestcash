import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {Logger} from '../services/logger.service';
import {AuthService} from '../services/auth.service';

const log = new Logger('AuthorizedGuard');

@Injectable({providedIn: 'root'})
export class AuthorizedGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authenticationService.hasAuthorization()) {
      return true;
    }

    log.debug('Unauthorized, redirecting to login page...');
    this.router.navigate(['/login'], {queryParams: {redirect: state.url}, replaceUrl: true});
    return false;
  }
}
