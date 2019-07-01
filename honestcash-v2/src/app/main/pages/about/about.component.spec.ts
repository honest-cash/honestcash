import {
  TestBed,
  async,
} from '@angular/core/testing';
import {MainAboutComponent} from './about.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('MainAboutComponent', () => {
  let component: MainAboutComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainAboutComponent
      ],
      imports: [
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
  }));

  beforeEach(() => {
    component = new MainAboutComponent();
  });

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
