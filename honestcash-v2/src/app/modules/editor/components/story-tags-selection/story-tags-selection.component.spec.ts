import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditorStoryTagsSelectionComponent} from './story-tags-selection.component';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../../shared/mocks/app.states.mock';
import {TagInputModule} from 'ngx-chips';
import {FormsModule} from '@angular/forms';

describe('EditorStoryTagsSelectionComponent', () => {
  let component: EditorStoryTagsSelectionComponent;
  let fixture: ComponentFixture<EditorStoryTagsSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        TagInputModule,
      ],
      providers: [
        provideMockStore({initialState: initialAppStates})
      ],
      declarations: [
        EditorStoryTagsSelectionComponent
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorStoryTagsSelectionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
