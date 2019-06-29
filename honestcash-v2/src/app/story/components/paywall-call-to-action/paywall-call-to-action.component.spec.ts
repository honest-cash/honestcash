import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from '@angular/core';
import {provideMockStore} from '@ngrx/store/testing';
import {PaywallCallToActionComponent} from './paywall-call-to-action.component';
import {initialAppStates} from '../../../app.states.mock';

describe('PaywallCallToActionComponent', () => {
  let component: PaywallCallToActionComponent;
  let fixture: ComponentFixture<PaywallCallToActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [PaywallCallToActionComponent],
      providers: [
        provideMockStore({initialState: initialAppStates})
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaywallCallToActionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('functions', () => {
    it('saveDraftStory should ', () => {

    });
  });
});
