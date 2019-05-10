import {
  TestBed,
  async,
} from '@angular/core/testing';
import {ThankYouComponent} from './thank-you.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('ThankYouComponent', () => {
  let component: ThankYouComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ThankYouComponent
      ],
      imports: [
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    });
    component = new ThankYouComponent();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
