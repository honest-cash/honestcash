import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditorLoadingIndicatorComponent} from './loading-indicator.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('SharedHonestLogoComponent', () => {
  let component: EditorLoadingIndicatorComponent;
  let fixture: ComponentFixture<EditorLoadingIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [EditorLoadingIndicatorComponent],
      providers: [],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });
    fixture = TestBed.createComponent(EditorLoadingIndicatorComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
