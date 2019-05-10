import {
  ComponentFixture,
  TestBed,
  async,
  discardPeriodicTasks,
  fakeAsync,
  tick
} from '@angular/core/testing';
import {ResetPasswordVerifyComponent, ResetPasswordForm} from './reset-password-verify.component';
import User from '../../../../core/models/user';
import {Store, StoreModule} from '@ngrx/store';
import {AppStates, metaReducers, reducers} from '../../../../app.states';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ResetPassword} from '../../../../core/store/auth/auth.actions';
import {ActivatedRoute, Params} from '@angular/router';
import {of} from 'rxjs';

const SHARED_MOCKS = {
  password: '123',
  resetCode: 'asdf',
};

describe('ResetPasswordVerifyComponent', () => {
  let component: ResetPasswordVerifyComponent;
  let store: Store<AppStates>;
  let mockActivatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResetPasswordVerifyComponent
      ],
      imports: [
        FormsModule,
        StoreModule.forRoot(reducers, { metaReducers }),
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({resetCode: SHARED_MOCKS.resetCode}) }}
      ]
    });
    store = TestBed.get(Store);
    mockActivatedRoute = TestBed.get(ActivatedRoute);
  }));

  beforeEach(() => {
    component = new ResetPasswordVerifyComponent(store, mockActivatedRoute);
  });

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
