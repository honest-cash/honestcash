import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedReceiptComponent } from './receipt.component';

describe('StoryUpvotesComponent', () => {
  let component: SharedReceiptComponent;
  let fixture: ComponentFixture<SharedReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
