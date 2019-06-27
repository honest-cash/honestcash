import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainStoryUpvotesComponent } from './story-comments.component';

describe('MainStoryUpvotesComponent', () => {
  let component: MainStoryUpvotesComponent;
  let fixture: ComponentFixture<MainStoryUpvotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainStoryUpvotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainStoryUpvotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
