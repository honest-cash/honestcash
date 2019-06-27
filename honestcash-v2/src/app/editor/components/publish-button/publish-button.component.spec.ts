import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditorPublishButtonComponent} from './publish-button.component';
import {Component, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../app.states.mock';
import {WindowToken} from '../../../../core/shared/helpers/window.helper';
import {EnvironmentToken} from '../../../../core/shared/helpers/environment.helper';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {AppStates} from '../../../app.states';
import {Store} from '@ngrx/store';
import Story from '../../../main/models/story';
import {EditorService} from '../../services/editor.service';
import {mock} from '../../../../../mock';
import {ELEMENT_TYPES} from '../../shared/json-to-html';
import {of} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EDITOR_STATUS, initialEditorState} from '../../store/editor.state';

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

export class MockNgbModalRef {
  public result: Promise<any> = new Promise((resolve, reject) => resolve('x'));
}

const MockModalService = {
  open: () => {
    return new MockNgbModalRef();
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
    },
  }
};

@Component({
  selector: 'editor-publish-modal',
  template: '<p>Mock Product Settings Component</p>'
})
class EditorPublishModalComponent {}

@NgModule({
  declarations: [EditorPublishModalComponent],
  entryComponents: [
    EditorPublishModalComponent,
  ],
  exports: [
    EditorPublishModalComponent
  ]
})
class PublishButtonTestingModule {}

describe('EditorPublishButtonComponent', () => {
  let component: EditorPublishButtonComponent;
  let fixture: ComponentFixture<EditorPublishButtonComponent>;
  let store: MockStore<AppStates>;
  let window: Window;
  let mockEditorService: EditorService;
  let toastr: ToastrService;
  let modalService: NgbModal;
  let warningSpy: jasmine.Spy;
  let openModalSpy: jasmine.Spy;

  beforeEach(async(() => {
    mockEditorService = mock(EditorService);
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot(),
        PublishButtonTestingModule,
      ],
      declarations: [
        EditorPublishButtonComponent,
      ],
      providers: [
        ToastrService,
        provideMockStore({initialState: initialAppStates}),
        {provide: NgbModal, useValue: MockModalService},
        {provide: EditorService, useValue: mockEditorService},
        {provide: WindowToken, useValue: MockWindow},
        {provide: EnvironmentToken, useValue: MockEnvironment},
        {provide: ToastrService, useValue: MockToastr},
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });


    fixture = TestBed.createComponent(EditorPublishButtonComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    toastr = TestBed.get(ToastrService);
    modalService = TestBed.get(NgbModal);
    mockEditorService = TestBed.get(EditorService);
    window = TestBed.get(WindowToken);

    warningSpy = spyOn(toastr, 'warning').and.callThrough();
    openModalSpy = spyOn(component, 'openModal').and.callThrough();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('constructor should', () => {
    it('have shouldDisablePublish set to true as default', () => {
      expect(component.shouldDisablePublish).toBeTruthy();
    });
  });

  describe('functions', () => {
    describe('ngOnInit should', () => {
      it('set story and saveStatus', () => {
        const title = 'asdf';
        const status = EDITOR_STATUS.Publishing;
        store.setState({
          ...initialAppStates,
          editor: {
            ...initialEditorState,
            story: {
              ...new Story(),
              title
            },
            status
          }
        });
        component.ngOnInit();
        expect(component.story.title).toEqual(title);
        expect(component.saveStatus).toEqual(status);
      });
      it('should call setShouldDisablePublish', () => {
        const setShouldDisablePublishSpy = spyOn(component, 'setShouldDisablePublish');
        component.ngOnInit();
        expect(setShouldDisablePublishSpy).toHaveBeenCalled();
      });
      it('should call setIsBodyEmpty', () => {
        const setIsBodyEmptySpy = spyOn(component, 'setIsBodyEmpty');
        component.ngOnInit();
        expect(setIsBodyEmptySpy).toHaveBeenCalled();
      });
    });

    describe('onPublishClicked should', () => {
      it('call toastr.warning if story.title is NOT DEFINED', () => {
        component.story = {
          ...new Story(),
        };
        delete component.story.title;
        component.onPublishClicked();
        expect(warningSpy).toHaveBeenCalled();
      });
      it('call toastr.warning if story.title is DEFINED but empty', () => {
        component.story = {
          ...new Story(),
          title: ''
        };
        component.onPublishClicked();
        expect(warningSpy).toHaveBeenCalled();
      });

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

      it('call toastr.warning if story.bodyJSON is NOT DEFINED', () => {
        const _updatedState = JSON.parse(JSON.stringify(initialState));
        delete _updatedState.editor.story.bodyJSON;
        store.setState(_updatedState);
        component.ngOnInit();
        fixture.detectChanges();

        component.onPublishClicked();
        expect(warningSpy).toHaveBeenCalled();
      });
      it('call toastr.warning if bodyJSON is empty', () => {
        const _updatedState = JSON.parse(JSON.stringify(initialState));
        _updatedState.editor.story.bodyJSON = [];
        store.setState(_updatedState);
        component.ngOnInit();
        fixture.detectChanges();

        component.onPublishClicked();
        expect(warningSpy).toHaveBeenCalled();
      });
      it('call toastr.warning if story.bodyJSON is NOT empty but there is only one paragraph element' +
        'and its text is undefined or empty', () => {
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

        component.onPublishClicked();
        expect(warningSpy).toHaveBeenCalled();
      });
      it('immediately call openModal if bodyJSON is not empty and has text and status is NOT NotSaved', () => {
        const result$ = of();
        const _updatedState = JSON.parse(JSON.stringify(initialState));
        (mockEditorService.savePostProperty as jasmine.Spy).and.returnValue(result$);
        _updatedState.editor.status = EDITOR_STATUS.Saved;
        store.setState(_updatedState);
        component.ngOnInit();
        component.onPublishClicked();
        expect(openModalSpy).toHaveBeenCalled();
      });
      it('first save story then call openModal if bodyJSON is not empty and has text and status is NotSaved', () => {
        (mockEditorService.savePostProperty as jasmine.Spy).and.callFake(() => ({
          subscribe: (callback) => callback()
        }));
        const _updatedState = JSON.parse(JSON.stringify(initialState));
        _updatedState.editor.status = EDITOR_STATUS.NotSaved;
        store.setState(_updatedState);
        component.ngOnInit();
        component.onPublishClicked();
        expect(mockEditorService.savePostProperty).toHaveBeenCalled();
        expect(openModalSpy).toHaveBeenCalled();
      });
    });

    describe('openModal should', () => {
      it('set modalRef and open modal if shouldDisablePublish is false and saveStatus is EditorLoaded', () => {
        const openSpy = spyOn(modalService, 'open').and.callThrough();
        component.shouldDisablePublish = false;
        component.saveStatus = EDITOR_STATUS.EditorLoaded;
        component.openModal();
        expect(openSpy).toHaveBeenCalled();
        expect(component.modalRef).toBeDefined();
      });
      it('open modal if shouldDisablePublish is false and saveStatus is Saved', () => {
        const openSpy = spyOn(modalService, 'open').and.callThrough();
        component.shouldDisablePublish = false;
        component.saveStatus = EDITOR_STATUS.Saved;
        component.openModal();
        expect(openSpy).toHaveBeenCalled();
      });
      it('NOT open modal if shouldDisablePublish is true', () => {
        const openSpy = spyOn(modalService, 'open').and.callThrough();
        component.shouldDisablePublish = true;
        component.saveStatus = EDITOR_STATUS.Saved;
        component.openModal();
        expect(openSpy).not.toHaveBeenCalled();
      });
      it('redirect user to story page when the modal closes and the saveStatus is Published', (done) => {
        const openSpy = spyOn(modalService, 'open').and.callThrough();
        component.story = initialState.editor.story;
        component.shouldDisablePublish = false;
        component.saveStatus = EDITOR_STATUS.EditorLoaded;
        component.openModal();
        component.saveStatus = EDITOR_STATUS.Published;
        component.modalRef.result.then(() => {
          expect(window.location.href).toEqual(`${MockEnvironment.clientUrl}${component.story.user.username}/${component.story.alias}`);
          done();
        });
      });
      it('NOT redirect user to story page when the modal closes and the saveStatus is NOT Published', (done) => {
        const openSpy = spyOn(modalService, 'open').and.callThrough();
        component.story = initialState.editor.story;
        component.shouldDisablePublish = false;
        component.saveStatus = EDITOR_STATUS.EditorLoaded;
        component.openModal();
        component.saveStatus = EDITOR_STATUS.NotSaved;
        component.modalRef.result.then(() => {
          expect(window.location.href).toEqual(MockWindow.location.href);
          done();
        });
      });
    });

    describe('setShouldDisablePublish should', () => {
      it('set shouldDisablePublish to true if saveStatus is NotInitialized', () => {
        component.shouldDisablePublish = false;
        component.saveStatus = EDITOR_STATUS.NotInitialized;
        component.setShouldDisablePublish();
        expect(component.shouldDisablePublish).toBeTruthy();
      });
      it('set shouldDisablePublish to true if saveStatus is Saving', () => {
        component.shouldDisablePublish = false;
        component.saveStatus = EDITOR_STATUS.Saving;
        component.setShouldDisablePublish();
        expect(component.shouldDisablePublish).toBeTruthy();
      });
      it('set shouldDisablePublish to true if saveStatus is Publishing', () => {
        component.shouldDisablePublish = false;
        component.saveStatus = EDITOR_STATUS.Saving;
        component.setShouldDisablePublish();
        expect(component.shouldDisablePublish).toBeTruthy();
      });
      it('set shouldDisablePublish to false if saveStatus is NOT NotInitialized, Saving or Publishing', () => {
        component.shouldDisablePublish = true;
        component.saveStatus = EDITOR_STATUS.EditorLoaded;
        component.setShouldDisablePublish();
        expect(component.shouldDisablePublish).toBeFalsy();
      });

    });
  });
});
