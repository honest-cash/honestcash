import {
  TestBed,
  async,
} from '@angular/core/testing';
import {MainContainerComponent} from './main-container.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('WelcomeContainerComponent', () => {
  let component: MainContainerComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainContainerComponent
      ],
      imports: [
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    });
    component = new MainContainerComponent();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
