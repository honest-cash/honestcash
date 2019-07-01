import {
  TestBed,
  async,
} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {AuthHeaderComponent} from './header.component';

describe('AuthHeaderComponent', () => {
  let component: AuthHeaderComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthHeaderComponent
      ],
      imports: [
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    });
    component = new AuthHeaderComponent();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
