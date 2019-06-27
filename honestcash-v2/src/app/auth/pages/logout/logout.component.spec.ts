import {async, TestBed,} from '@angular/core/testing';
import {AuthLogoutComponent} from './logout.component';
import {Store, StoreModule} from '@ngrx/store';
import {AppStates, metaReducers, reducers} from '../../../app.states';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {LogOut} from '../../../../store/auth/auth.actions';

describe('AuthLogoutComponent', () => {
  let component: AuthLogoutComponent;
  let store: Store<AppStates>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthLogoutComponent
      ],
      imports: [
        StoreModule.forRoot(reducers, {metaReducers}),
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    component = new AuthLogoutComponent(store);
  });

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch LogOut action on ngOnInit with no payload', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    const action = new LogOut();
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

});
