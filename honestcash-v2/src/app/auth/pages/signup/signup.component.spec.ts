import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AuthSignupComponent, SignupForm} from './signup.component';
import User from '../../../user/models/user';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../app.states';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../app.states.mock';
import {CodedErrorResponse} from '../../models/authentication';
import {AuthErrorHelper} from '../../helpers/auth-error.helper';
import {SignUp} from '../../store/auth.actions';
import {initialAuthState} from '../../store/auth.state';

const SHARED_MOCKS = {
  username: 'toto',
  email: 'toto@toto.com',
  password: '123',
  resetCode: 'asdf',
  captcha: 'asdf',
};

describe('AuthSignupComponent', () => {
  let component: AuthSignupComponent;
  let store: MockStore<AppStates>;
  let fixture: ComponentFixture<AuthSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthSignupComponent
      ],
      imports: [
        FormsModule,
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        provideMockStore({initialState: initialAppStates}),
      ]
    });
    (<any>window).grecaptcha = {
      getResponse: (): string => SHARED_MOCKS.captcha,
      reset: (): void => {
      },
      render: (id: string) => {
      }
    };
    fixture = TestBed.createComponent(AuthSignupComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isLoading false, errorMessage undefined and an empty User as initial on construct', () => {
    component.ngOnInit();
    expect(component.isLoading).toBeFalsy();
    expect(component.errorMessage).toBeUndefined();
    expect(component.user).toEqual(new User());
  });

  it('should subscribe to authState and set errorMessage and isLoading correctly if they are specified in store', async () => {
    const errorMessage: CodedErrorResponse = {
      code: 400,
      desc: 'EXAMPLE_FAILURE',
      httpCode: 400,
    };
    store.setState({
      ...initialAppStates,
      auth: {
        isLoading: true,
        errorMessage,
        isAuthenticated: false,
        newPasswordSet: false,
        newPasswordRequested: false,
        token: null,
      }
    });

    fixture = TestBed.createComponent(AuthSignupComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    component = fixture.componentInstance;

    const subscribeSpy = spyOn(component.authState, 'subscribe');
    component.ngOnInit();
    fixture.detectChanges();
    expect(subscribeSpy).toHaveBeenCalled();

    const expectedErrorMessage = AuthErrorHelper.getErrorDesc(errorMessage);

    expect(component.isLoading).toBeTruthy();
    expect(component.errorMessage).toEqual(expectedErrorMessage);

  });

  it('should subscribe to authState and delete errorMessage and set isLoading correctly ' +
    'if there is no error message specified in store', async () => {

    fixture.detectChanges();
    await fixture.whenStable();
    component = fixture.componentInstance;

    const subscribeSpy = spyOn(component.authState, 'subscribe');
    component.ngOnInit();
    fixture.detectChanges();
    expect(subscribeSpy).toHaveBeenCalled();

    expect(component.isLoading).toEqual(initialAuthState.isLoading);
    expect(component.errorMessage).toBeUndefined();

  });

  it('should fire renderCaptcha function ngOnInit', () => {
    const dispatchSpy = spyOn(component, 'renderCaptcha');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should render captcha on ngOnInit via renderCaptcha', () => {
    component.ngOnInit();
    expect(component.isCaptchaRendered).toBeTruthy();
  });

  it('should return void onSubmit if captcha is unavailable', () => {
    (<any>window).grecaptcha = {
      getResponse: (): string => '', // deliberately return an empty captcha
      reset: (): void => {
      },
      render: (id: string) => {
      }
    };
    const grecaptchaResetSpy = spyOn((<any>window).grecaptcha, 'reset');
    const dispatchSpy = spyOn(store, 'dispatch');
    const payload = {
      value: {
        email: SHARED_MOCKS.email,
        username: SHARED_MOCKS.username,
        password: SHARED_MOCKS.password,
        captcha: SHARED_MOCKS.captcha,
      },
    };
    component.ngOnInit();
    component.onSubmit(<SignupForm>payload);
    expect(component.isCaptchaValid).toBeFalsy();
    expect(grecaptchaResetSpy).toHaveBeenCalled();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should dispatch SignUp action onSubmit and set isLoading to true', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const payload = {
      value: {
        email: SHARED_MOCKS.email,
        username: SHARED_MOCKS.username,
        password: SHARED_MOCKS.password,
        captcha: SHARED_MOCKS.captcha,
      },
    };
    const action = new SignUp(payload.value);
    component.ngOnInit();
    component.onSubmit(<SignupForm>payload);
    expect(component.isLoading).toBeTruthy();
    expect(dispatchSpy).toHaveBeenCalledWith(action);

  });

  it('renderCaptcha function should render captcha', () => {
    component.renderCaptcha();
    expect(component.isCaptchaRendered).toBeTruthy();
  });

  it('renderCaptcha function should try to render captcha every 1 secs', fakeAsync(() => {
    (<any>window).grecaptcha = {
      getResponse: (): string => '',
      reset: (): void => {
      },
      render: (id: string) => {
        throw new Error('asdf'); // explicitly make render fail to trigger setTimeout
      }
    };
    // make it fail on first try
    component.renderCaptcha();
    expect(component.isCaptchaRendered).toBeFalsy();

    // make it work on second try (to test setTimeout)
    (<any>window).grecaptcha = {
      getResponse: (): string => '',
      reset: (): void => {
      },
      render: (id: string) => { // change it back so that it suddenly works
      }
    };
    fixture.detectChanges();
    const dispatchSpy = spyOn(component, 'renderCaptcha');
    tick(1000);
    fixture.detectChanges();
    expect(component.isCaptchaRendered).toBeTruthy();
    expect(dispatchSpy).toHaveBeenCalled();
  }));

});
