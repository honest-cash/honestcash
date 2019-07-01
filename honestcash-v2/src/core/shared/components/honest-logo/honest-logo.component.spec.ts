import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SharedHonestLogoComponent} from './honest-logo.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

const MockWindow = {
  location: {
    href: '',
  }
};

describe('SharedHonestLogoComponent', () => {
  let component: SharedHonestLogoComponent;
  let fixture: ComponentFixture<SharedHonestLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [SharedHonestLogoComponent],
      providers: [],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });
    fixture = TestBed.createComponent(SharedHonestLogoComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
