import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidSectionToggleButtonComponent } from './paid-section-toggle-button.component';

describe('PaidSectionToggleButtonComponent', () => {
  let component: PaidSectionToggleButtonComponent;
  let fixture: ComponentFixture<PaidSectionToggleButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidSectionToggleButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidSectionToggleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
