import {
  TestBed,
  async,
} from '@angular/core/testing';
import {WelcomeComponent} from './welcome.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Store, StoreModule} from '@ngrx/store';
import {AppStates, metaReducers, reducers} from '../../../app.states';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let store: Store<AppStates>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WelcomeComponent
      ],
      imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    });
    store = TestBed.get(Store);
    component = new WelcomeComponent(store);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
