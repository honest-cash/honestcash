import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CoreHonestLogoComponent} from './honest-logo.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

const MockWindow = {
  location: {
    href: '',
  }
};

describe('CoreHonestLogoComponent', () => {
  let component: CoreHonestLogoComponent;
  let fixture: ComponentFixture<CoreHonestLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [CoreHonestLogoComponent],
      providers: [],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });
    fixture = TestBed.createComponent(CoreHonestLogoComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
