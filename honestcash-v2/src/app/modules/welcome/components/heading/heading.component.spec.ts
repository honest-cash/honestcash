import {
  TestBed,
  async,
} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      imports: [
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    });
    component = new HeaderComponent();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
