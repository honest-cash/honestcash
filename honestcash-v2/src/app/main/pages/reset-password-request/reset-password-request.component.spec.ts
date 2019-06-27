import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ResetPasswordRequestComponent, ResetPasswordRequestForm} from './reset-password-request.component';
import User from '../../../shared/models/user';
import {Store, StoreModule} from '@ngrx/store';
import {AppStates, metaReducers, reducers} from '../../../app.states';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ResetPasswordRequest} from '../../../../store/auth/auth.actions';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../shared/mocks/app.states.mock';
import {CodedErrorResponse} from '../../../shared/models/authentication';
import {WelcomeErrorHandler} from '../../shared/helpers/welcome-error.handler';
import {initialState as initialAuthState} from '../../../../store/auth/auth.state';

describe('ResetPasswordRequestComponent', () => {
  let component: ResetPasswordRequestComponent;
  let store: MockStore<AppStates>;
  let fixture: ComponentFixture<ResetPasswordRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResetPasswordRequestComponent
      ],
      imports: [
        FormsModule,
        StoreModule.forRoot(reducers, {metaReducers}),
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        provideMockStore({initialState: initialAppStates})
      ]
    });
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(ResetPasswordRequestComponent);
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

    fixture = TestBed.createComponent(ResetPasswordRequestComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    component = fixture.componentInstance;

    const subscribeSpy = spyOn(component.authState, 'subscribe');
    component.ngOnInit();
    fixture.detectChanges();
    expect(subscribeSpy).toHaveBeenCalled();

    const expectedErrorMessage = WelcomeErrorHandler.getErrorDesc(errorMessage);

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

  it('should subscribe to authState and delete errorMessage and set isLoading correctly ' +
    'if newPasswordRequest is true or in store', async () => {

    store.setState({
      ...initialAppStates,
      auth: {
        ...initialAppStates.auth,
        newPasswordRequested: true,
      }
    });

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
      },
    };
    const action = new ResetPasswordRequest(payload.value);
    component.onSubmit(<ResetPasswordRequestForm>payload);
    expect(component.isLoading).toBeTruthy();
    expect(dispatchSpy).toHaveBeenCalledWith(action);

  });

});
