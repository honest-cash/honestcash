import {
  TestBed,
  async,
} from '@angular/core/testing';
import {AuthFooterComponent} from './footer.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('AuthFooterComponent', () => {
  let component: AuthFooterComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthFooterComponent
      ],
      imports: [
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    });
    component = new AuthFooterComponent();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
