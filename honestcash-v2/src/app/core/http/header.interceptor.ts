import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../shared/services/auth.service';

export const ContentTypeFormDataHeader = 'X-Multipart-Formdata';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  private authService: AuthService;

  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthService);
    const token: string = this.authService.getToken();
    let hasFormDataHeader: boolean;
    const cloneOptions = {
      setHeaders: {
        'Content-Type': 'application/json'
      }
    };

    if (hasFormDataHeader = request.headers.has(ContentTypeFormDataHeader)) {
      // this is necessary to make uploading work
      // otherwise multipart/form-data is not set with boundary meaning
      // no file is attached
      // since we pass a new FormData object as body to the request
      // the HttpClient is smart enough to figure it out
      /* istanbul ignore next: functionality is tested */
      delete cloneOptions.setHeaders['Content-Type'];
    }
    if (token) {
      cloneOptions.setHeaders['x-auth-token'] = `${token}`;
    }

    if (token || hasFormDataHeader) {
      request = request.clone(cloneOptions);
    }

    return next.handle(request);
  }
}
