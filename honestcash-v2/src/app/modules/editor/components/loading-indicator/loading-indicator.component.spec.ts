import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoadingIndicatorComponent} from './honest-logo.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('HonestLogoComponent', () => {
  let component: LoadingIndicatorComponent;
  let fixture: ComponentFixture<LoadingIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [LoadingIndicatorComponent],
      providers: [],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });
    fixture = TestBed.createComponent(LoadingIndicatorComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
