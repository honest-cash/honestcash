import {
  TestBed,
  async,
} from '@angular/core/testing';
import {StatusComponent} from './status.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Store, StoreModule} from '@ngrx/store';
import {AppStates, metaReducers, reducers} from '../../../../app.states';

describe('StatusComponent', () => {
  let component: StatusComponent;
  let store: Store<AppStates>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StatusComponent
      ],
      imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    });
    store = TestBed.get(Store);
    component = new StatusComponent(store);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
