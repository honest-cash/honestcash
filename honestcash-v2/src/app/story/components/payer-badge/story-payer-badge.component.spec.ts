import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainStoryUpvoteComponent } from './story-payer-badge.component';

describe('MainStoryUpvoteComponent', () => {
  let component: MainStoryUpvoteComponent;
  let fixture: ComponentFixture<MainStoryUpvoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainStoryUpvoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainStoryUpvoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
