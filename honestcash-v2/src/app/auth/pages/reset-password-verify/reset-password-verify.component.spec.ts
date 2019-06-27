import {async, ComponentFixture, TestBed,} from '@angular/core/testing';
import {ResetPasswordForm, ResetPasswordVerifyComponent} from './reset-password-verify.component';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../app.states';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ResetPassword} from '../../../../store/auth/auth.actions';
import {ActivatedRoute, Params} from '@angular/router';
import {of} from 'rxjs';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../app.states.mock';
import {CodedErrorResponse} from '../../models/authentication';
import {AuthErrorHelper} from '../../helpers/auth-error.helper';
import {initialState as initialAuthState} from '../../../../store/auth/auth.state';

const SHARED_MOCKS = {
  password: '123',
  resetCode: 'asdf',
};

describe('ResetPasswordVerifyComponent', () => {
  let component: ResetPasswordVerifyComponent;
  let store: MockStore<AppStates>;
  let mockActivatedRoute: ActivatedRoute;
  let fixture: ComponentFixture<ResetPasswordVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResetPasswordVerifyComponent
      ],
      imports: [
        FormsModule,
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        provideMockStore({initialState: initialAppStates}),
        {provide: ActivatedRoute, useValue: {params: of({resetCode: SHARED_MOCKS.resetCode})}}
      ]
    });
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(ResetPasswordVerifyComponent);
    component = fixture.componentInstance;
    mockActivatedRoute = TestBed.get(ActivatedRoute);
  }));

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isLoading false, errorMessage undefined and an empty User as initial on construct', () => {
    const initialState = {
      email: '',
      code: '',
      newPassword: '',
      repeatNewPassword: '',
    };
    component.ngOnInit();
    expect(component.isLoading).toBeFalsy();
    expect(component.errorMessage).toBeUndefined();
    expect(component.values).toEqual(initialState);
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

    fixture = TestBed.createComponent(ResetPasswordVerifyComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    component = fixture.componentInstance;

    const subscribeSpy = spyOn(component.auth$, 'subscribe');
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

    const subscribeSpy = spyOn(component.auth$, 'subscribe');
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

    const subscribeSpy = spyOn(component.auth$, 'subscribe');
    component.ngOnInit();
    fixture.detectChanges();
    expect(subscribeSpy).toHaveBeenCalled();

    expect(component.isLoading).toEqual(initialAuthState.isLoading);
    expect(component.errorMessage).toBeUndefined();

  });

  it('should get resetCode as param via ActivatedRoute and set it to instance variable', (done) => {
    component.ngOnInit();
    mockActivatedRoute.params.subscribe((params: Params) => {
      expect(component.resetCode).toEqual(SHARED_MOCKS.resetCode);
      done();
    });
  });

  it('should dispatch ResetPassword action onSubmit and set isLoading to true', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const payload = {
      value: {
        email: 'toto@toto.com',
        code: SHARED_MOCKS.resetCode,
        newPassword: SHARED_MOCKS.password,
        repeatNewPassword: SHARED_MOCKS.password,
      },
    };
    const action = new ResetPassword(payload.value);
    component.ngOnInit();
    component.onSubmit(<ResetPasswordForm>payload);
    expect(component.isLoading).toBeTruthy();
    expect(dispatchSpy).toHaveBeenCalledWith(action);

  });

});
