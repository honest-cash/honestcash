import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditorStoryTagsSelectionComponent} from './story-tags-selection.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../../core/shared/mocks/app.states.mock';
import {TagInputModule} from 'ngx-chips';
import {FormsModule} from '@angular/forms';
import {AppStates} from '../../../app.states';
import {Store} from '@ngrx/store';
import {EDITOR_STATUS, initialState as initialEditorState} from '../../store/editor.state';
import Hashtag from '../../models/hashtag';
import {EditorStoryPropertyChange} from '../../store/editor.actions';
import {STORY_PROPERTIES} from '../../shared/editor.story-properties';

const initialState = {
  ...initialAppStates,
  editor: {
    ...initialEditorState,
    status: EDITOR_STATUS.NotSaved,
    story: {
      ...initialEditorState.story,
      userPostHashtags: [
        {
          id: 1,
          hashtag: 'hashtag 1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userPostId: 34,
        },
        {
          id: 2,
          hashtag: 'hashtag 2',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userPostId: 34,
        }
      ]
    }
  }
};

describe('EditorStoryTagsSelectionComponent', () => {
  let component: EditorStoryTagsSelectionComponent;
  let fixture: ComponentFixture<EditorStoryTagsSelectionComponent>;
  let store: MockStore<AppStates>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        TagInputModule,
      ],
      providers: [
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        provideMockStore({initialState})
      ],
      declarations: [
        EditorStoryTagsSelectionComponent
      ],
    });

    fixture = TestBed.createComponent(EditorStoryTagsSelectionComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('functions', () => {
    describe('ngOnInit should', () => {
      it('set _hashtags equal to story.userPostHashtags', () => {
        delete component._hashtags;
        component.ngOnInit();
        expect(component._hashtags).toEqual(initialState.editor.story.userPostHashtags);
      });
      it('set _hashtags equal to empty array if story.userPostHashtags is undefined', () => {
        const stateWithoutUserPostHashtags = {
          ...initialState,
          editor: {
            ...initialState.editor,
            story: {
              ...initialState.editor.story,
            }
          }
        };
        delete stateWithoutUserPostHashtags.editor.story.userPostHashtags;
        store.setState(stateWithoutUserPostHashtags);
        component.ngOnInit();
        expect(component._hashtags).toEqual([]);
      });
      it('NOT set _hashtags if it is already defined', () => {
        const hashtags: Hashtag[] = [
          {
            id: 3,
            hashtag: 'hashtag 3',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            userPostId: 34,
          },
          {
            id: 4,
            hashtag: 'hashtag 4',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            userPostId: 34,
          }
        ];

        component._hashtags = hashtags;
        component.ngOnInit();
        expect(component._hashtags).toEqual(hashtags);
      });
    });

    describe('onTagChange should', () => {
      it('dispatch EditorStoryPropertyChange with Hashtags as property and tags as value', () => {
        const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
        const tags = [
          {
            hashtag: 'hashtag 1',
          },
          {
            hashtag: 'hashtag 2'
          }
        ];
        component.onTagChange(tags);

        expect(dispatchSpy).toHaveBeenCalledWith(new EditorStoryPropertyChange({property: STORY_PROPERTIES.Hashtags, value: tags}));
      });
    });
  });
});
