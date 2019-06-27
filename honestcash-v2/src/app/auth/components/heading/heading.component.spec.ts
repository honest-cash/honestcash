import {
  TestBed,
  async,
} from '@angular/core/testing';
import {AuthHeadingComponent} from './heading.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('AuthHeadingComponent', () => {
  let component: AuthHeadingComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthHeadingComponent
      ],
      imports: [
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    });
    component = new AuthHeadingComponent();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
