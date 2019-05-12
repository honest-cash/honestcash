import {
  TestBed,
  async,
} from '@angular/core/testing';
import {HeadingComponent} from './heading.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('HeadingComponent', () => {
  let component: HeadingComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeadingComponent
      ],
      imports: [
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    });
    component = new HeadingComponent();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
