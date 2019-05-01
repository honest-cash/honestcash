import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authenticationService: AuthenticationService;
  constructor(private injector: Injector) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authenticationService = this.injector.get(AuthenticationService);
    const token: string = this.authenticationService.token;
    if (token) {
      request = request.clone({
        setHeaders: {
          'x-auth-token': `${token}`,
          'Content-Type': 'application/json'
        }
      });
    }
    return next.handle(request);
  }
}
