import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HTTP_INTERCEPTORS, HttpClient, HttpResponse} from '@angular/common/http';

import {CacheInterceptor} from './cache.interceptor';
import {HttpCacheService} from './http-cache.service';
import {WindowToken} from '../helpers/window';

const MockWindow = {
  location: {
    href: '',
  }
};

describe('CacheInterceptor', () => {
  let interceptorOptions: Object | null = {};
  let httpCacheService: HttpCacheService;
  let cacheInterceptor: CacheInterceptor;
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let componentWindow: Window;

  function createInterceptor(_httpCacheService: HttpCacheService) {
    cacheInterceptor = new CacheInterceptor(_httpCacheService).configure(interceptorOptions);
    return cacheInterceptor;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpCacheService,
        {
          provide: HTTP_INTERCEPTORS,
          useFactory: createInterceptor,
          deps: [HttpCacheService],
          multi: true
        },
        {provide: WindowToken, useValue: MockWindow},
      ]
    });
    componentWindow = TestBed.get(WindowToken);
  });

  afterEach(() => {
    httpCacheService.cleanCache();
    httpMock.verify();
  });

  describe('with default configuration', () => {
    beforeEach(() => {
      interceptorOptions = null;
    });

    beforeEach(inject(
      [HttpClient, HttpTestingController, HttpCacheService],
      (_http: HttpClient, _httpMock: HttpTestingController, _httpCacheService: HttpCacheService) => {
        http = _http;
        httpMock = _httpMock;
        httpCacheService = _httpCacheService;
      }
    ));

    it('should cache the request if it is GET request', () => {
      // Act
      http.get('/toto').subscribe(() => {
        // Assert
        const cachedData = httpCacheService.getCacheData('/toto');
        expect(cachedData).toBeDefined();
        expect(cachedData ? cachedData.body : null).toEqual('someData');
      });

      httpMock.expectOne({url: '/toto'}).flush('someData');
    });

    it('should NOT cache the request if it is NOT a GET request', () => {
      // Act
      http.post('/toto', {}).subscribe(() => {
        // Assert
        const cachedData = httpCacheService.getCacheData('/toto');
        expect(cachedData).toBeNull();
      });

      httpMock.expectOne({url: '/toto'}).flush('someData');
    });

    it('should respond from the cache', () => {
      // Arrange
      httpCacheService.setCacheData('/toto', new HttpResponse({body: 'cachedData'}));

      // Act
      http.get('/toto').subscribe(response => {
        // Assert
        expect(response).toEqual('cachedData');
      });

      httpMock.expectNone({url: '/toto'});
    });

    it('should not cache the request in case of error', () => {
      // Act
      http.get('/toto').subscribe(
        () => {
        },
        () => {
          // Assert
          expect(httpCacheService.getCacheData('/toto')).toBeNull();
        }
      );

      httpMock.expectOne({}).flush(null, {
        status: 404,
        statusText: 'error'
      });
    });
  });

  describe('with update forced configuration', () => {
    beforeEach(() => {
      interceptorOptions = {update: true};
    });

    beforeEach(inject(
      [HttpClient, HttpTestingController, HttpCacheService],
      (_http: HttpClient, _httpMock: HttpTestingController, _httpCacheService: HttpCacheService) => {
        http = _http;
        httpMock = _httpMock;
        httpCacheService = _httpCacheService;
      }
    ));

    afterEach(() => {
      httpCacheService.cleanCache();
      httpMock.verify();
    });

    it('should force cache update', () => {
      // Arrange
      httpCacheService.setCacheData('/toto', new HttpResponse({body: 'oldCachedData'}));
      cacheInterceptor.configure({update: true});

      // Act
      http.get('/toto').subscribe(response => {
        // Assert
        expect(response).toEqual('newData');
      });

      httpMock.expectOne({url: '/toto'}).flush('newData');
    });
  });
});
