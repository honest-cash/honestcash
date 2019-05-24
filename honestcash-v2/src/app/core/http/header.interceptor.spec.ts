import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HTTP_INTERCEPTORS, HttpClient, HttpHeaders} from '@angular/common/http';

import {ContentTypeFormDataHeader, HeaderInterceptor} from './header.interceptor';
import {MockAuthenticationService} from '../mocks/authentication.service.mock';
import {AuthService} from '../services/auth.service';

describe('TokenInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  // @todo: use jamine.Spy to replace the mock services. too much overhead.
  let authenticationService: MockAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: AuthService, useClass: MockAuthenticationService},
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HeaderInterceptor,
          multi: true
        }
      ]
    });
  });

  beforeEach(inject([
    HttpClient, HttpTestingController, AuthService
  ], (_http: HttpClient, _httpMock: HttpTestingController, _authenticationService: MockAuthenticationService) => {
    http = _http;
    httpMock = _httpMock;
    authenticationService = _authenticationService;
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should append token to the request headers as x-auth-token if the user is authenticated', () => {
    authenticationService.setToken('testtoken');
    // Act
    http.get('http://test.com/toto').subscribe();

    // Assert
    const httpRequest = httpMock.expectOne({url: 'http://test.com/toto'});
    expect(httpRequest.request.headers.has('x-auth-token')).toEqual(true);
  });

  it('should not append token to the request headers as x-auth-token if the user is not authenticated', () => {
    authenticationService.unsetToken();

    // Act
    http.get('http://test.com/toto').subscribe();

    // Assert
    const httpRequest = httpMock.expectOne({url: 'http://test.com/toto'});
    expect(httpRequest.request.headers.has('x-auth-token')).toEqual(false);
  });

  it('should delete Content-Type when ContentTypeFormDataHeader header is present to make upload work', () => {
    // Arrange
    const httpOptions = {
      headers: new HttpHeaders().set(ContentTypeFormDataHeader, '')
    };
    // Act
    http.get('http://test.com/toto', httpOptions).subscribe();

    // Assert
    const httpRequest = httpMock.expectOne({url: 'http://test.com/toto'});
    expect(httpRequest.request.headers.has('Content-Type')).toEqual(false);
  });
});
