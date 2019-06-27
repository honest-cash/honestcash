import {async, TestBed,} from '@angular/core/testing';
import {CardFooterComponent} from './footer.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('CardFooterComponent', () => {
  let component: CardFooterComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardFooterComponent
      ],
      imports: [],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    });
    component = new CardFooterComponent();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
