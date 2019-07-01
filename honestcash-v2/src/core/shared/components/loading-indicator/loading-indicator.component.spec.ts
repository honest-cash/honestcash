import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SharedLoadingIndicatorComponent} from './loading-indicator.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('SharedLoadingIndicatorComponent', () => {
  let component: SharedLoadingIndicatorComponent;
  let fixture: ComponentFixture<SharedLoadingIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [SharedLoadingIndicatorComponent],
      providers: [],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });
    fixture = TestBed.createComponent(SharedLoadingIndicatorComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
