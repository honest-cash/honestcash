import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Logger } from '../services/logger.service';
import { AuthenticationService } from '../services/authentication.service';

const log = new Logger('AuthorizedGuard');

@Injectable({providedIn: 'root'})
export class AuthorizedGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(): boolean {
    if (this.authenticationService.isAuthenticated) {
      return true;
    }

    log.debug('Unauthorized, redirecting to welcome page...');
    this.router.navigateByUrl('/thank-you');
    return false;
  }
}
