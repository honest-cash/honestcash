import {
  ComponentFixture,
  TestBed,
  async,
  discardPeriodicTasks,
  fakeAsync,
  tick
} from '@angular/core/testing';
import {ResetPasswordRequestComponent, ResetPasswordRequestForm} from './reset-password-request.component';
import User from '../../../../core/models/user';
import {Store, StoreModule} from '@ngrx/store';
import {AppStates, metaReducers, reducers} from '../../../../app.states';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ResetPasswordRequest} from '../../../../core/store/auth/auth.actions';

describe('ResetPasswordRequestComponent', () => {
  let component: ResetPasswordRequestComponent;
  let store: Store<AppStates>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResetPasswordRequestComponent
      ],
      imports: [
        FormsModule,
        StoreModule.forRoot(reducers, { metaReducers }),
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    component = new ResetPasswordRequestComponent(store);
  });

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
