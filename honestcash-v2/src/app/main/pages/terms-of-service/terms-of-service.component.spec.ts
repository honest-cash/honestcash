import {
  TestBed,
  async,
} from '@angular/core/testing';
import {MainTermsOfServiceComponent} from './terms-of-service.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('MainTermsOfServiceComponent', () => {
  let component: MainTermsOfServiceComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainTermsOfServiceComponent
      ],
      imports: [
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
  }));

  beforeEach(() => {
    // component = new MainTermsOfServiceComponent();
  });

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
