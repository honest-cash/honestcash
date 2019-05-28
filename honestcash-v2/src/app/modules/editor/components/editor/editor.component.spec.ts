import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EDITOR_AUTO_SAVE, EditorComponent} from './editor.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../../shared/mocks/app.states.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EditorService} from '../../services/editor.service';
import {mock} from '../../../../../../mock';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../../app.states';
import {EDITOR_STATUS, initialState as initialEditorState} from '../../../../store/editor/editor.state';
import {EditorChange, EditorLoad} from '../../../../store/editor/editor.actions';
import {of} from 'rxjs';
import Post from '../../../../shared/models/post';
import blankBody from '../../../../store/editor/editor.story.body.initial-value';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let mockEditorService: EditorService;
  let store: Store<AppStates>;

  beforeEach(async(() => {
    mockEditorService = mock(EditorService);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgbModule,
      ],
      declarations: [EditorComponent],
      providers: [
        {provide: EditorService, useValue: mockEditorService},
        provideMockStore({initialState: initialAppStates})
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });

    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    component.hasEditorInitialized = false;
    EDITOR_AUTO_SAVE.ON = false;
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('constructor', () => {
    it('should have EDITOR_AUTO_SAVE.ON set to false', () => {
      expect(EDITOR_AUTO_SAVE.ON).toBeFalsy();
    });
    it('should have story UNDEFINED when not provided via Input', () => {
      expect(component.story).toBeUndefined();
    });
    it('should have story DEFINED when provided via Input', () => {
      component.story = new Post();
      expect(component.story).toBeDefined();
    });
    it('should have hasEditorInitialized as false', () => {
      expect(component.hasEditorInitialized).toBeFalsy();
    });
    it('should initialize EditorJS', () => {
      expect(component.editor).toBeDefined();
    });
    it('should should dispatch EditorLoad action when editor is ready', () => {
      component.editor.isReady.then(() => {
        expect(store.dispatch).toHaveBeenCalledWith(new EditorLoad({editor: component.editor}));
      });
    });
  });

  describe('ngOnInit', () => {
    it('should set saveStatus', () => {
      component.editorStateObservable = of(initialEditorState);
      component.ngOnInit();
      expect(component.saveStatus).toEqual(EDITOR_STATUS.NotInitialized);
    });
    it('should clear editor blocks and set hasEditorInitialized to true', () => {
      const editor = component.editor;
      const blocks = editor.blocks;
      const clearSpy = spyOn(blocks, 'clear').and.callThrough();
      component.story = new Post();
      component.editorStateObservable = of({
        ...initialEditorState,
        status: EDITOR_STATUS.Initialized,
      });
      component.ngOnInit();
      expect(clearSpy).toHaveBeenCalled();
      expect(component.hasEditorInitialized).toBeTruthy();
    });
    it('should clear editor blocks, set the body if provided post via Input has a body and set hasEditorInitialized to true', () => {
      const editor = component.editor;
      const blocks = editor.blocks;
      const clearSpy = spyOn(blocks, 'clear').and.callThrough();
      const renderSpy = spyOn(blocks, 'render').and.callThrough();
      component.story = new Post();
      component.story.body = blankBody;
      component.editorStateObservable = of({
        ...initialEditorState,
        status: EDITOR_STATUS.Initialized,
      });
      component.ngOnInit();
      expect(clearSpy).toHaveBeenCalled();
      expect(renderSpy).toHaveBeenCalledWith({blocks: blankBody});
      expect(component.hasEditorInitialized).toBeTruthy();
    });
  });

  describe('onEditorChange', () => {
    it('should trigger save method on the editor', () => {
      const editor = component.editor;
      const saver = editor.saver;
      const saveSpy = spyOn(saver, 'save').and.callThrough();
      component.onEditorChange();
      expect(saveSpy).toHaveBeenCalled();
    });
    it('should dispatch EditorChange with story and editor', () => {
      component.story = new Post();
      const editor = component.editor;
      const saver = editor.saver;
      spyOn(saver, 'save').and.returnValue(of({blocks: blankBody}).toPromise());
      component.onEditorChange();
      fixture.detectChanges();
      editor.isReady.then(() => {
        expect(component.story.body).toEqual(blankBody);
        expect(store.dispatch).toHaveBeenCalledWith(new EditorChange({story: component.story, editor: component.editor}));
      });
    });
  });
});
