import {async, ComponentFixture, TestBed,} from '@angular/core/testing';
import {AuthWelcomeComponent} from './welcome.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('AuthWelcomeComponent', () => {
  let fixture: ComponentFixture<AuthWelcomeComponent>;
  let component: AuthWelcomeComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthWelcomeComponent
      ],
      imports: [
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    });
    fixture = TestBed.createComponent(AuthWelcomeComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
