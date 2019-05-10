import {
  TestBed,
  async,
} from '@angular/core/testing';
import {FooterComponent} from './footer.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('FooterComponent', () => {
  let component: FooterComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FooterComponent
      ],
      imports: [
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    });
    component = new FooterComponent();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
