import {
  TestBed,
  async,
} from '@angular/core/testing';
import {WelcomeContainerComponent} from './welcome.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('WelcomeContainerComponent', () => {
  let component: WelcomeContainerComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WelcomeContainerComponent
      ],
      imports: [
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    });
    component = new WelcomeContainerComponent();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
