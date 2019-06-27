import {
  TestBed,
  async,
} from '@angular/core/testing';
import {AuthThankYouComponent} from './thank-you.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('AuthThankYouComponent', () => {
  let component: AuthThankYouComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthThankYouComponent
      ],
      imports: [
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    });
    component = new AuthThankYouComponent();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
