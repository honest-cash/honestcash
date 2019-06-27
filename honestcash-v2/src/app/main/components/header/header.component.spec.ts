import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../app.states.mock';
import {cold} from 'jasmine-marbles';
import {LogOut} from '../../../auth/store/auth.actions';
import User from '../../../user/models/user';
import {GOTO_PATHS} from '../header-profile-menu/header-profile-menu.component';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../app.states';
import {WindowToken} from '../../../../core/helpers/window.helper';
import {localStorageProvider, LocalStorageToken} from '../../../../core/helpers/local-storage.helper';

const MockWindow = {
  location: {
    href: '',
  }
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: Store<AppStates>;
  let componentWindow: Window;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [HeaderComponent],
      providers: [
        {provide: WindowToken, useValue: MockWindow},
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        {provide: LocalStorageToken, useFactory: localStorageProvider},
        provideMockStore({initialState: initialAppStates})
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    componentWindow = TestBed.get(WindowToken);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have menuHidden true on init', () => {
    expect(component.menuHidden).toBeTruthy();
  });

  describe('functions', () => {
    describe('toggleMenu', () => {
      it('should switch to true when initialized false', () => {
        component.menuHidden = false;
        component.toggleMenu();
        expect(component.menuHidden).toBeTruthy();
      });
      it('should switch to false when initialized true', () => {
        component.menuHidden = true;
        component.toggleMenu();
        expect(component.menuHidden).toBeFalsy();
      });
    });
    describe('logout', () => {
      it('should dispatch LogOut action', () => {
        component.logout();
        const logoutAction = cold('a', {a: new LogOut()});
        expect(store.dispatch).toHaveBeenCalled();
      });
    });
    describe('goTo', () => {
      it('should go change location.href to correct URL when provided with a profile path with the userId', () => {
        const username = 'toto';
        component.user = new User();
        component.user.username = username;
        fixture.detectChanges();

        component.goTo('profile');
        expect(componentWindow.location.href).toEqual(GOTO_PATHS.profile(username));
      });
      it('should go change location.href to correct URL when provided with a posts path', () => {
        component.goTo('posts');
        expect(componentWindow.location.href).toEqual(GOTO_PATHS.posts());
      });
      it('should go change location.href to correct URL when provided with a wallet path', () => {
        component.goTo('wallet');
        expect(componentWindow.location.href).toEqual(GOTO_PATHS.wallet());
      });
      it('should go change location.href to correct URL when provided with a help path', () => {
        component.goTo('help');
        expect(componentWindow.location.href).toEqual(GOTO_PATHS.faq());
      });
      it('should go change location.href to correct URL when provided with a terms of service path', () => {
        component.goTo('terms-of-service');
        expect(componentWindow.location.href).toEqual(GOTO_PATHS.tos());
      });
      it('should go change location.href to correct URL when provided with a privacy policy path', () => {
        component.goTo('privacy-policy');
        expect(componentWindow.location.href).toEqual(GOTO_PATHS.privacyPolicy());
      });
    });
  });
});
