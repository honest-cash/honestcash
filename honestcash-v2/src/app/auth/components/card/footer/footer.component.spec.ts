import {async, TestBed,} from '@angular/core/testing';
import {AuthCardFooterComponent} from './footer.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('AuthCardFooterComponent', () => {
  let component: AuthCardFooterComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthCardFooterComponent
      ],
      imports: [],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    });
    component = new AuthCardFooterComponent();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
