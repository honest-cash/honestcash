import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Logger } from '../services/logger.service';
import { AuthenticationService } from '../services/authentication.service';

const log = new Logger('UnauthorizedGuard');

@Injectable({providedIn: 'root'})
export class UnauthorizedGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(): boolean {
    if (!this.authenticationService.hasAuthorization()) {
      return true;
    }

    log.debug('Authorized, redirecting to feed page...');
    this.router.navigateByUrl('/feed');
    return false;
  }
}
