import {
  TestBed,
  async,
} from '@angular/core/testing';
import {LogoutComponent} from './logout.component';
import {Store, StoreModule} from '@ngrx/store';
import {AppStates, metaReducers, reducers} from '../../../../app.states';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { LogOut} from '../../../../core/store/auth/auth.actions';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let store: Store<AppStates>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LogoutComponent
      ],
      imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    component = new LogoutComponent(store);
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
