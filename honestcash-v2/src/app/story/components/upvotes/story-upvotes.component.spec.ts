import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryUpvotesComponent } from './story-upvotes.component';

describe('StoryUpvotesComponent', () => {
  let component: StoryUpvotesComponent;
  let fixture: ComponentFixture<StoryUpvotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryUpvotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryUpvotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
