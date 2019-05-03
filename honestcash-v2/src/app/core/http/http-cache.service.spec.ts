import { TestBed, inject } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';

import { HttpCacheService, HttpCacheEntry } from './http-cache.service';

const cachePersistenceKey = 'httpCache';

describe('HttpCacheService', async () => {
  let httpCacheService: HttpCacheService;
  let response: HttpResponse<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpCacheService]
    });

    // Start fresh
    window.sessionStorage.removeItem(cachePersistenceKey);
    window.localStorage.removeItem(cachePersistenceKey);
  });

  beforeEach(inject([HttpCacheService], (_httpCacheService: HttpCacheService) => {
    httpCacheService = _httpCacheService;

    response = new HttpResponse({ body: 'data' });
  }));

  afterEach(() => {
    httpCacheService.cleanCache();
  });

  describe('setCacheData', async () => {
    it('should set cache data', async () => {
      // Act
      httpCacheService.setCacheData('/popo', response);

      // Assert
      expect(httpCacheService.getCacheData('/popo')).toEqual(response);
    });

    it('should replace existing data', async () => {
      // Arrange
      const newResponse = new HttpResponse({ body: 'new data' });

      // Act
      httpCacheService.setCacheData('/popo', response);
      httpCacheService.setCacheData('/popo', newResponse);

      // Assert
      expect(httpCacheService.getCacheData('/popo')).toEqual(newResponse);
    });

    it('should set cache date correctly', async () => {
      // Act
      const date = new Date(123);
      httpCacheService.setCacheData('/popo', response, date);
      httpCacheService.setCacheData('/hoho', response);

      // Assert
      expect((<HttpCacheEntry>httpCacheService.getHttpCacheEntry('/popo')).lastUpdated).toBe(date);
      expect((<HttpCacheEntry>httpCacheService.getHttpCacheEntry('/hoho')).lastUpdated).not.toBe(date);
    });
  });

  describe('getCacheData', async () => {
    it('should return null if no cache', async () => {
      expect(httpCacheService.getCacheData('/hoho')).toBe(null);
    });

    it('should return cached data if exists', async () => {
      // Act
      httpCacheService.setCacheData('/hoho', response);

      // Assert
      expect(httpCacheService.getCacheData('/hoho')).toEqual(response);
    });

    it('should return cached data with url parameters if exists', async () => {
      // Act
      httpCacheService.setCacheData('/hoho?pif=paf', response);

      // Assert
      expect(httpCacheService.getCacheData('/hoho?pif=paf')).toEqual(response);
    });
  });

  describe('getHttpCacheEntry', async () => {
    it('should return null if no cache', async () => {
      expect(httpCacheService.getHttpCacheEntry('/hoho')).toBe(null);
    });

    it('should return cached data date  if exists', async () => {
      // Arrange
      const date = new Date(123);

      // Act
      httpCacheService.setCacheData('/hoho', response, date);
      const entry = httpCacheService.getHttpCacheEntry('/hoho');

      // Assert
      expect(entry).not.toBeNull();
      expect((<HttpCacheEntry>entry).lastUpdated).toEqual(date);
      expect((<HttpCacheEntry>entry).data).toEqual(response);
    });
  });

  describe('clearCacheData', async () => {
    it('should clear existing cache data', async () => {
      // Set cache
      httpCacheService.setCacheData('/hoho', response);
      expect(httpCacheService.getCacheData('/hoho')).toEqual(response);

      // Clear cache
      httpCacheService.clearCache('/hoho');
      expect(httpCacheService.getCacheData('/hoho')).toBe(null);
    });

    it('should do nothing if no cache exists', async () => {
      expect(httpCacheService.getCacheData('/lolo')).toBe(null);
      httpCacheService.clearCache('/hoho');
      expect(httpCacheService.getCacheData('/lolo')).toBe(null);
    });
  });

  describe('cleanCache', async () => {
    it('should clear all cache if no date is specified', async () => {
      // Set cache
      httpCacheService.setCacheData('/hoho', response);
      httpCacheService.setCacheData('/popo', response);
      expect(httpCacheService.getCacheData('/hoho')).toBe(response);
      expect(httpCacheService.getCacheData('/popo')).toBe(response);

      // Clean cache
      httpCacheService.cleanCache();
      expect(httpCacheService.getCacheData('/hoho')).toBe(null);
      expect(httpCacheService.getCacheData('/popo')).toBe(null);
    });

    it('should clear existing since specified date', async () => {
      // Set cache
      httpCacheService.setCacheData('/hoho', response);
      expect(httpCacheService.getCacheData('/hoho')).toBe(response);

      // Clean cache
      httpCacheService.cleanCache(new Date());
      expect(httpCacheService.getCacheData('/hoho')).toBe(null);
    });

    it('should not affect cache entries newer than specified date', async () => {
      // Set cache
      httpCacheService.setCacheData('/hoho', response);
      expect(httpCacheService.getCacheData('/hoho')).toBe(response);

      // Clean cache
      const date = new Date();
      httpCacheService.setCacheData('/lolo', response, new Date(date.getTime() + 10));
      httpCacheService.cleanCache(date);

      // Assert
      expect(httpCacheService.getCacheData('/hoho')).toBe(null);
      expect(httpCacheService.getCacheData('/lolo')).toBe(response);
    });
  });

  describe('setPersistence', async () => {
    beforeEach(() => {
      httpCacheService.setPersistence();
      httpCacheService.cleanCache = jasmine.createSpy('cleanCache');
    });

    it('should clear previous cache data when persistence value change', async () => {
      httpCacheService.setPersistence('local');
      expect(httpCacheService.cleanCache).toHaveBeenCalledWith();
    });

    it('should persist cache to local storage', async () => {
      expect(localStorage.getItem(cachePersistenceKey)).toBeNull();

      httpCacheService.setPersistence('local');
      httpCacheService.setCacheData('/hoho', response);

      expect(localStorage.getItem(cachePersistenceKey)).not.toBeNull();
    });

    it('should persist cache to session storage', async () => {
      expect(sessionStorage.getItem(cachePersistenceKey)).toBeNull();

      httpCacheService.setPersistence('session');
      httpCacheService.setCacheData('/hoho', response);

      expect(sessionStorage.getItem(cachePersistenceKey)).not.toBeNull();
    });
  });
});
