import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpService} from '..';
import {mock} from '../../../../mock';
import {UserService} from './user.service';
import {of} from 'rxjs';
import User from '../models/user';
import {API_ENDPOINTS} from './user.service';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from '../../app.states';
import {AppRoutingModule} from '../../app-routing.module';

const SHARED_MOCKS = {
  mnemonic: 'test test2 test3 test4',
};

describe('UserService', () => {
  let userService: UserService;
  let httpServiceMock: HttpService;

  beforeEach(() => {
    httpServiceMock = mock(HttpService);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppRoutingModule,
        StoreModule.forRoot(reducers, { metaReducers}),
      ],
      providers: [
        UserService,
        {provide: HttpService, useValue: httpServiceMock}
      ]
    });
    userService = TestBed.get(UserService);
  });

  afterEach(() => {
    // Cleanup
  });

  describe('instance', () => {
    it('should have been initialized', () => {
      expect(userService).toBeDefined();
    });
  });

  describe('getMe', () => {
    it('should make API request to the correct API endpoint', (done) => {
      const mocks = {
        getMeSuccess: new User(),
      };
      (<jasmine.Spy>httpServiceMock.get).and.returnValue(of(mocks.getMeSuccess));
      // Act
      userService.getMe().subscribe((response: User) => {
        // Assert
        expect(httpServiceMock.get)
          .toHaveBeenCalledWith(API_ENDPOINTS.status);
        done();
      });

    });
  });


});
