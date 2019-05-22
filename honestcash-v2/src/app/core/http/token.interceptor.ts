import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authenticationService: AuthService;

  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authenticationService = this.injector.get(AuthService);
    const token: string = this.authenticationService.getToken();
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
