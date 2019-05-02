import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import { Logger } from '../services/logger.service';
import { AuthenticationService } from '../services/authentication.service';

const log = new Logger('AuthorizedGuard');

@Injectable({providedIn: 'root'})
export class AuthorizedGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authenticationService.hasAuthorization()) {
      return true;
    }

    log.debug('Unauthorized, redirecting to login page...');
    this.router.navigate('/login', { queryParams: { redirect: state.url }, replaceUrl: true });
    return false;
  }
}
