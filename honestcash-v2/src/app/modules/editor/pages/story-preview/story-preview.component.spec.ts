import {async, ComponentFixture, TestBed,} from '@angular/core/testing';
import {EditorStoryPreviewComponent} from './story-preview.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('StoryComponent', () => {
  let component: EditorStoryPreviewComponent;
  let fixture: ComponentFixture<EditorStoryPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditorStoryPreviewComponent
      ],
      imports: [],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorStoryPreviewComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
