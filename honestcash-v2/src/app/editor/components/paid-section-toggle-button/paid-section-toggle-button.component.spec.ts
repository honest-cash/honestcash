import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditorPaidSectionToggleButtonComponent} from './paid-section-toggle-button.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../app.states.mock';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {AppStates} from '../../../app.states';
import {Store} from '@ngrx/store';
import Story from '../../../story/models/story';
import {EditorStoryPropertyChange} from '../../store/editor.actions';
import {EDITOR_STORY_PROPERTIES} from '../../shared/editor.story-properties';
import {initialEditorState} from '../../store/editor.state';

describe('EditorPaidSectionToggleButtonComponent', () => {
  let component: EditorPaidSectionToggleButtonComponent;
  let fixture: ComponentFixture<EditorPaidSectionToggleButtonComponent>;
  let store: MockStore<AppStates>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NgbModule,
      ],
      providers: [
        provideMockStore({initialState: initialAppStates})
      ],
      declarations: [EditorPaidSectionToggleButtonComponent],
    });

    fixture = TestBed.createComponent(EditorPaidSectionToggleButtonComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('functions', () => {
    describe('ngOnInit should', () => {
      it('set story', () => {
        const title = 'test';
        store.setState({
          ...initialAppStates,
          editor: {
            ...initialEditorState,
            story: {
              ...new Story(),
              title
            }
          }
        });
        component.ngOnInit();
        expect(component.story.title).toEqual(title);
      });
    });
    describe('onChangeHasPaidSection should', () => {
      it('dispatch EditorStoryPropertyChange with HasPaidSection has property and story.hasPaidSection as value', () => {
        const hasPaidSection = true;
        component.story = {
          ...new Story(),
          hasPaidSection
        };
        component.onChangeHasPaidSection();
        expect(store.dispatch).toHaveBeenCalledWith(new EditorStoryPropertyChange({property: EDITOR_STORY_PROPERTIES.HasPaidSection, value: hasPaidSection}));
      });
    });
  });
});
