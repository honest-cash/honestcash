import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HonestLogoComponent} from './honest-logo.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

const MockWindow = {
  location: {
    href: '',
  }
};

describe('HonestLogoComponent', () => {
  let component: HonestLogoComponent;
  let fixture: ComponentFixture<HonestLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [HonestLogoComponent],
      providers: [],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });
    fixture = TestBed.createComponent(HonestLogoComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
