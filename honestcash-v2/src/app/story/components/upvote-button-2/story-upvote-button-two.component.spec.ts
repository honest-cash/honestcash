import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryUpvoteButtonTwoComponent } from './story-upvote-button-two.component';

describe('StoryUpvoteButtonTwoComponent', () => {
  let component: StoryUpvoteButtonTwoComponent;
  let fixture: ComponentFixture<StoryUpvoteButtonTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryUpvoteButtonTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryUpvoteButtonTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
