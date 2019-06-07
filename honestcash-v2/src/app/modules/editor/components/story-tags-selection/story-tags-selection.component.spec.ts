import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryTagsSelectionComponent } from './story-tags-selection.component';

describe('StoryTagsSelectionComponent', () => {
  let component: StoryTagsSelectionComponent;
  let fixture: ComponentFixture<StoryTagsSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryTagsSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryTagsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
