import {async, ComponentFixture, TestBed,} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {GOTO_PATHS, UserProfileMenuComponent} from './profile-menu.component';
import {Router} from '@angular/router';
import {WindowToken} from '../../../../core/shared/helpers/window.helper';
import {localStorageProvider, LocalStorageToken} from '../../../../core/shared/helpers/local-storage.helper';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../app.states.mock';
import {AuthEffects} from '../../../auth/store/auth.effects';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../app.states';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {cold} from 'jasmine-marbles';
import {LogOut} from '../../../auth/store/auth.actions';
import User from '../../models/user';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';
import {WalletService} from '../../../wallet/services/wallet.service';
import {UserService} from '../../services/user.service';

const MockWindow = {
  location: {
    href: '',
  }
};

describe('HeaderProfileMenu', () => {
  let effects: AuthEffects;
  let component: UserProfileMenuComponent;
  let fixture: ComponentFixture<UserProfileMenuComponent>;
  let router: Router;
  let store: MockStore<AppStates>;
  let componentWindow: Window;
  let actions: Observable<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserProfileMenuComponent
      ],
      imports: [
        HttpClientTestingModule,
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        {
          provide: Router, useValue: {
            navigate: () => {
            },
            navigateByUrl: () => {
            }
          }
        },
        WalletService,
        UserService,
        AuthEffects,
        {provide: WindowToken, useValue: MockWindow},
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        {provide: LocalStorageToken, useFactory: localStorageProvider},
        provideMockActions(() => actions),
        provideMockStore({initialState: initialAppStates})
      ]
    });
    fixture = TestBed.createComponent(UserProfileMenuComponent);
    component = fixture.componentInstance;

    router = TestBed.get(Router);
    effects = TestBed.get(AuthEffects);
    store = TestBed.get(Store);
    componentWindow = TestBed.get(WindowToken);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();
    spyOn(router, 'navigateByUrl').and.callThrough();
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
        const user = new User();
        user.username = 'asdf';
        user.imageUrl = 'asdfasdf';
        store.setState({
          ...initialAppStates,
          user: {
            user
          }
        });
        fixture.detectChanges();

        component.goTo('profile');
        expect(componentWindow.location.href).toEqual(GOTO_PATHS.profile(user.username));
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
