import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AuthLoginComponent, LoginForm} from './login.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import User from '../../../user/models/user';
import {Store} from '@ngrx/store';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CodedErrorResponse} from '../../models/authentication';
import {AppStates} from '../../../app.states';
import {initialAppStates} from '../../../app.states.mock';
import {AuthErrorHelper} from '../../helpers/auth-error.helper';
import {initialAuthState} from '../../store/auth.state';
import {LogIn} from '../../store/auth.actions';

describe('AuthLoginComponent', () => {
  let component: AuthLoginComponent;
  let store: MockStore<AppStates>;
  let fixture: ComponentFixture<AuthLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthLoginComponent
      ],
      imports: [
        FormsModule,
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        provideMockStore({initialState: initialAppStates})
      ]
    });
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(AuthLoginComponent);
    component = fixture.componentInstance;
  }));

  afterEach(() => {
  });

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

    fixture = TestBed.createComponent(AuthLoginComponent);
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

  it('should subscribe to authState and delete errorMessage and set isLoading correctly if they are NOT specified in store', async () => {

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

  it('should dispatch LogIn action onSubmit and set isLoading to true', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const payload = {
      value: {
        email: 'toto@toto.com',
        password: '123',
      },
    };
    const action = new LogIn(payload.value);
    component.onSubmit(<LoginForm>payload);
    expect(component.isLoading).toBeTruthy();
    expect(dispatchSpy).toHaveBeenCalledWith(action);

  });

});
