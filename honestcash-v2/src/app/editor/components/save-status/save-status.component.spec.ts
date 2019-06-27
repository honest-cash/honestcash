import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditorSaveStatusComponent} from './save-status.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../app.states.mock';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {EDITOR_STATUS, initialState as initialEditorState} from '../../store/editor.state';
import Story from '../../../main/models/story';
import {AppStates} from '../../../app.states';
import {Store} from '@ngrx/store';
import {EDITOR_EDITING_MODES} from '../header/header.component';
import {EditorStoryPropertySave} from '../../store/editor.actions';
import {STORY_PROPERTIES} from '../../shared/editor.story-properties';

const MockToastr = {
  warning: (message: string, title: string, override: {positionClass: string}) => {
  }
};

const initialState = {
  ...initialAppStates,
  editor: {
    ...initialEditorState,
    story: {
      ...new Story(),
    },
  },

};

describe('EditorSaveStatusComponent', () => {
  let component: EditorSaveStatusComponent;
  let fixture: ComponentFixture<EditorSaveStatusComponent>;
  let store: MockStore<AppStates>;
  let toastr: ToastrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot(),
      ],
      declarations: [EditorSaveStatusComponent],
      providers: [
        provideMockStore({initialState}),
        {provide: ToastrService, useValue: MockToastr},
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });

    fixture = TestBed.createComponent(EditorSaveStatusComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    toastr = TestBed.get(ToastrService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('functions', () => {
    describe('ngOnInit should', () => {
      it('set story and saveStatus', () => {
        const title = 'asdf';
        const status = EDITOR_STATUS.Publishing;
        const state = {
          ...initialState,
          editor: {
            ...initialEditorState,
            story: {
              ...new Story(),
              title
            },
            status
          }
        };
        store.setState(state);
        component.ngOnInit();
        expect(component.story.title).toEqual(title);
        expect(component.saveStatus).toEqual(status);
      });
      it('call setIsBodyEmpty', () => {
        const setIsBodyEmptySpy = spyOn(component, 'setIsBodyEmpty').and.callThrough();
        component.ngOnInit();
        expect(setIsBodyEmptySpy).toHaveBeenCalled();
      });
      it('call setAutoSaveInterval if isAutoSaveEnabled is true', () => {
        const setAutosaveIntervalSpy = spyOn(component, 'setAutosaveInterval').and.callThrough();
        component.isAutosaveEnabled = true;
        component.ngOnInit();
        expect(setAutosaveIntervalSpy).toHaveBeenCalled();
      });
      it('NOT call setAutoSaveInterval if isAutoSaveEnabled is false', () => {
        const setAutosaveIntervalSpy = spyOn(component, 'setAutosaveInterval').and.callThrough();
        component.isAutosaveEnabled = false;
        component.ngOnInit();
        expect(setAutosaveIntervalSpy).not.toHaveBeenCalled();
      });
    });

    describe('onSaveClick should', () => {
      it('call toastr.warning if editingMode is not Comment when story.title is UNDEFINED', () => {
        const warningSpy = spyOn(toastr, 'warning');
        component.editingMode = EDITOR_EDITING_MODES.Write;
        component.story = new Story();
        delete component.story.title;
        component.onSaveClick();
        expect(warningSpy).toHaveBeenCalled();
      });
      it('call toastr.warning if editingMode is not Comment and there is story title but its empty', () => {
        const warningSpy = spyOn(toastr, 'warning');
        component.isBodyEmpty = false;
        component.editingMode = EDITOR_EDITING_MODES.Write;
        component.story = new Story();
        component.story.title = '';
        component.onSaveClick();
        expect(warningSpy).toHaveBeenCalled();
      });
      it('NOT call toastr.warning if editingMode is not Comment and there is story title and its not empty', () => {
        const warningSpy = spyOn(toastr, 'warning');
        component.isBodyEmpty = false;
        component.editingMode = EDITOR_EDITING_MODES.Write;
        component.story = new Story();
        component.story.title = 'test';
        component.onSaveClick();
        expect(warningSpy).not.toHaveBeenCalled();
      });
      it('NOT call toastr.warning if editingMode is Comment', () => {
        const warningSpy = spyOn(toastr, 'warning');
        component.isBodyEmpty = false;
        component.editingMode = EDITOR_EDITING_MODES.Comment;
        component.story = new Story();
        component.story.title = '';
        component.onSaveClick();
        expect(warningSpy).not.toHaveBeenCalled();
      });
      it('call toastr.warning if isBodyEmpty is true', () => {
        const warningSpy = spyOn(toastr, 'warning');
        component.editingMode = EDITOR_EDITING_MODES.Comment;
        component.isBodyEmpty = true;
        component.onSaveClick();
        expect(warningSpy).toHaveBeenCalled();
      });
      it('NOT call toastr.warning if isBodyEmpty is false', () => {
        const warningSpy = spyOn(toastr, 'warning');
        component.editingMode = EDITOR_EDITING_MODES.Comment;
        component.isBodyEmpty = false;
        component.onSaveClick();
        expect(warningSpy).not.toHaveBeenCalled();
      });
      it('set isSaveButtonClicked and calls saveStory', () => {
        const saveStorySpy = spyOn(component, 'saveStory');
        component.editingMode = EDITOR_EDITING_MODES.Comment;
        component.isBodyEmpty = false;
        component.onSaveClick();
        expect(component.isSaveButtonClicked).toBeTruthy();
        expect(saveStorySpy).toHaveBeenCalled();
      });
    });

    describe('saveStory should', () => {
      it('call dispatch EditorStoryPropertySave with story as story and BodyAndTitle as property when saveStatus is NotSaved', () => {
        const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
        component.saveStatus = EDITOR_STATUS.NotSaved;
        component.story = new Story();
        component.story.title = 'test';
        component.saveStory();
        expect(dispatchSpy).toHaveBeenCalledWith(new EditorStoryPropertySave({story: component.story, property: STORY_PROPERTIES.BodyAndTitle}));
      });
      it('NOT call dispatch EditorStoryPropertySave when saveStatus is something other than NotSaved', () => {
        const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
        component.saveStatus = EDITOR_STATUS.Saved;
        component.story = new Story();
        component.story.title = 'test';
        component.saveStory();
        expect(dispatchSpy).not.toHaveBeenCalled();
      });
      it('call dispatch EditorStoryPropertySave with story as story and BodyAndTitle as property when story.title is defined and its not empty', () => {
        const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
        component.saveStatus = EDITOR_STATUS.NotSaved;
        component.story = new Story();
        component.story.title = 'test';
        component.saveStory();
        expect(dispatchSpy).toHaveBeenCalledWith(new EditorStoryPropertySave({story: component.story, property: STORY_PROPERTIES.BodyAndTitle}));
      });
      it('NOT call dispatch EditorStoryPropertySave if story.title is empty', () => {
        const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
        component.saveStatus = EDITOR_STATUS.NotSaved;
        component.story = new Story();
        component.story.title = '';
        component.saveStory();
        expect(dispatchSpy).not.toHaveBeenCalled();
      });
    });

    describe('setAutosaveInterval should', () => {

    });

    describe('ngOnDestroy should', () => {
      it('unsubscribe from editorState if it exists', () => {
        const editorSub = {
          unsubscribe: () => {}
        };
        const unsubscribeSpy = spyOn(editorSub, 'unsubscribe');
        component.editorSub = editorSub as any;
        component.ngOnDestroy();
        expect(unsubscribeSpy).toHaveBeenCalled();
      });
      it('unsubscribe from autoSaveState if it exists', () => {
        const autoSaveSub = {
          unsubscribe: () => {}
        };
        const unsubscribeSpy = spyOn(autoSaveSub, 'unsubscribe');
        component.autoSaveSub = autoSaveSub as any;
        component.ngOnDestroy();
        expect(unsubscribeSpy).toHaveBeenCalled();
      });
    });
  });
});
