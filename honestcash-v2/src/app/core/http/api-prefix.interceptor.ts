import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../auth/authentication.service';

/**
 * Prefixes all requests with `environment.apiUrl`.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(private authentificationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authentificationService.credentials) {
      if (!/^(http|https):/i.test(request.url)) {
        request = request.clone({
          url: environment.apiUrl + request.url
        });
      }

      request = request.clone({
        setHeaders: {
          'x-auth-token': `${this.authentificationService.credentials.token}`
        }
      });
    }

    return next.handle(request);
  }
}
