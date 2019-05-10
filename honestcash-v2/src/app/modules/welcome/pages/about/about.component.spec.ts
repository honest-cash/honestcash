import {
  TestBed,
  async,
} from '@angular/core/testing';
import {AboutComponent} from './about.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('AboutComponent', () => {
  let component: AboutComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AboutComponent
      ],
      imports: [
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
  }));

  beforeEach(() => {
    component = new AboutComponent();
  });

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
