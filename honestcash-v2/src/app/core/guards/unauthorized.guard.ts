import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {Logger} from '../services/logger.service';
import {AuthService} from '../services/auth.service';

const log = new Logger('UnauthorizedGuard');

@Injectable({providedIn: 'root'})
export class UnauthorizedGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthService) {
  }

  canActivate(): boolean {
    if (!this.authenticationService.hasAuthorization()) {
      return true;
    }

    log.debug('Authorized, redirecting to feed page...');
    this.router.navigateByUrl('/feed');

    return false;
  }
}
