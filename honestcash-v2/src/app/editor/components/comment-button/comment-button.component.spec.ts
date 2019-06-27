import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditorCommentButtonComponent} from './comment-button.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../app.states.mock';
import {EDITOR_STATUS, initialState as initialEditorState} from '../../store/editor.state';
import {WindowToken} from '../../../../core/helpers/window.helper';
import {EnvironmentToken} from '../../../../core/helpers/environment.helper';
import Story from '../../../main/models/story';
import {ELEMENT_TYPES} from '../../shared/json-to-html';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../app.states';
import {ToastrModule, ToastrService} from 'ngx-toastr';

const MockWindow = {
  location: {
    href: '',
  }
};

const MockEnvironment = {
  clientUrl: 'http://mockUrl.com/'
};

const MockToastr = {
  warning: (message: string, title: string, override: {positionClass: string}) => {
  }
};


const bodyJSON = [
  {
    type: ELEMENT_TYPES.Paragraph,
    data: {
      text: 'comment paragraph 1'
    }
  },
  {
    type: ELEMENT_TYPES.Header,
    data: {
      text: 'comment header 1'
    }
  },
  {
    type: ELEMENT_TYPES.Paragraph,
    data: {
      text: 'comment paragraph 2'
    }
  },
];

const initialState = {
  ...initialAppStates,
  editor: {
    ...initialEditorState,
    status: EDITOR_STATUS.NotSaved,
    story: {
      ...initialEditorState.story,
      id: 50,
      title: 'comment',
      alias: 'comment-50',
      bodyJSON,
      parentPostId: 55,
      parentPost: {
        ...new Story(),
        id: 55,
        title: 'parent post',
        bodyJSON: [
          {
            type: ELEMENT_TYPES.Paragraph,
            data: {
              text: 'parent post paragraph 1'
            }
          },
          {
            type: ELEMENT_TYPES.Header,
            data: {
              text: 'parent post header 1'
            }
          },
          {
            type: ELEMENT_TYPES.Paragraph,
            data: {
              text: 'parent post paragraph 2'
            }
          },
        ]
      },
      user: {
        username: 'testuser',
      }
    }
  }
};
describe('EditorCommentButtonComponent', () => {
  let component: EditorCommentButtonComponent;
  let fixture: ComponentFixture<EditorCommentButtonComponent>;
  let store: MockStore<AppStates>;
  let window: Window;
  let toastr: ToastrService;
  let dispatchSpy: jasmine.Spy;
  let warningSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot(),
      ],
      declarations: [EditorCommentButtonComponent],
      providers: [
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        {provide: WindowToken, useValue: MockWindow},
        {provide: ToastrService, useValue: MockToastr},
        {provide: EnvironmentToken, useValue: MockEnvironment},
        provideMockStore({initialState: {...initialState}})
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });

    fixture = TestBed.createComponent(EditorCommentButtonComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    window = TestBed.get(WindowToken);
    toastr = TestBed.get(ToastrService);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    warningSpy = spyOn(toastr, 'warning').and.callThrough();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('functions', () => {
    describe('ngOnInit should', () => {
      it('set story and saveStatus on the instance via store', () => {
        component.ngOnInit();
        fixture.detectChanges();
        expect(component.story.title).toBe(initialState.editor.story.title);
        expect(component.saveStatus).toBe(initialState.editor.status);
      });

      it('redirect to the published (commented) post when saveStatus is Published', () => {
        store.setState({
          ...initialState,
          editor: {
            ...initialState.editor,
            status: EDITOR_STATUS.Published,
          }
        });
        component.ngOnInit();
        fixture.detectChanges();

        expect(window.location.href).toEqual(`${MockEnvironment.clientUrl}${initialState.editor.story.user.username}/${initialState.editor.story.alias}`);
      });

      it('should call setShouldDisablePublish', () => {
        const setShouldDisablePublishSpy = spyOn(component, 'setCanPublishComment');
        component.ngOnInit();
        expect(setShouldDisablePublishSpy).toHaveBeenCalled();
      });
      it('should call setIsBodyEmpty', () => {
        const setIsBodyEmptySpy = spyOn(component, 'setIsBodyEmpty');
        component.ngOnInit();
        expect(setIsBodyEmptySpy).toHaveBeenCalled();
      });
    });
    describe('onCommentClicked', () => {
      beforeEach(() => {
        store.setState({
          ...initialState,
          editor: {
            ...initialState.editor,
            story: {
              ...initialState.editor.story,
              bodyJSON
            }
          }
        });
        fixture.detectChanges();
      });
      it('should prevent user from publishing if bodyJSON is not defined', () => {
        const _updatedState = JSON.parse(JSON.stringify(initialState));
        delete _updatedState.editor.story.bodyJSON;
        store.setState(_updatedState);
        component.ngOnInit();
        fixture.detectChanges();

        component.onCommentClicked();
        expect(warningSpy).toHaveBeenCalled();
      });
      it('should prevent user from publishing if bodyJSON is empty', () => {
        const _updatedState = JSON.parse(JSON.stringify(initialState));
        _updatedState.editor.story.bodyJSON = [];
        store.setState(_updatedState);
        component.ngOnInit();
        fixture.detectChanges();

        component.onCommentClicked();
        expect(warningSpy).toHaveBeenCalled();
      });
      it('should prevent user from publishing if bodyJSON is NOT empty but there is only one paragraph element and its text is undefined or empty', () => {
        const _updatedState = JSON.parse(JSON.stringify(initialState));
        _updatedState.editor.story.bodyJSON = [
          {
            type: ELEMENT_TYPES.Paragraph,
            data: {
              text: ''
            }
          }
        ];
        store.setState(_updatedState);
        component.ngOnInit();
        fixture.detectChanges();

        component.onCommentClicked();
        expect(warningSpy).toHaveBeenCalled();
      });
      it('should dispatch EditorStorySaveAndPublish when EditorStatus is EditorLoaded', () => {
        const _updatedState = JSON.parse(JSON.stringify(initialState));
        _updatedState.editor.status = EDITOR_STATUS.EditorLoaded;

        store.setState(_updatedState);
        component.ngOnInit();
        fixture.detectChanges();

        component.onCommentClicked();
        expect(dispatchSpy).toHaveBeenCalled();
      });
      it('should dispatch EditorStorySaveAndPublish when EditorStatus is Saved', () => {
        const _updatedState = JSON.parse(JSON.stringify(initialState));
        _updatedState.editor.status = EDITOR_STATUS.Saved;

        store.setState(_updatedState);
        component.ngOnInit();
        fixture.detectChanges();

        component.onCommentClicked();
        expect(dispatchSpy).toHaveBeenCalled();
      });
      it('should dispatch EditorStorySaveAndPublish when EditorStatus is NotSaved', () => {
        const _updatedState = JSON.parse(JSON.stringify(initialState));
        _updatedState.editor.status = EDITOR_STATUS.NotSaved;

        store.setState(_updatedState);
        component.ngOnInit();
        fixture.detectChanges();

        component.onCommentClicked();
        expect(dispatchSpy).toHaveBeenCalled();
      });
    });
  });
});
