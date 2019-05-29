import {async, ComponentFixture, TestBed,} from '@angular/core/testing';
import {EditorStoryPreviewComponent} from './story-preview.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../../shared/mocks/app.states.mock';

describe('EditorStoryPreviewComponent', () => {
  let component: EditorStoryPreviewComponent;
  let fixture: ComponentFixture<EditorStoryPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditorStoryPreviewComponent
      ],
      imports: [],
      providers: [
        provideMockStore({initialState: initialAppStates})
      ],
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
