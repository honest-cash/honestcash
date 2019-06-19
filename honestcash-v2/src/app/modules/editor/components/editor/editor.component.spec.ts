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
import {EditorLoad, EditorStoryPropertyChange} from '../../../../store/editor/editor.actions';
import {of} from 'rxjs';
import Post from '../../../../shared/models/post';
import {ELEMENT_TYPES} from '../../converters/json-to-html';
import {STORY_PROPERTIES} from '../../shared/editor.story-properties';

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
        {provide: 'PLATFORM_ID', useValue: 'browser'},
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
    spyOn(store, 'dispatch').and.callThrough();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('constructor', () => {
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
    xit('should initialize EditorJS', () => {
      expect(component.editor).toBeDefined();
    });
    xit('should should dispatch EditorLoad action when editor is ready', () => {
      component.editor.isReady.then(() => {
        expect(store.dispatch).toHaveBeenCalledWith(new EditorLoad());
      });
    });
  });

  xdescribe('ngOnInit', () => {
    it('should set saveStatus', () => {
      component.editor$ = of(initialEditorState);
      component.ngOnInit();
      expect(component.saveStatus).toEqual(EDITOR_STATUS.NotInitialized);
    });
    it('should clear editor blocks, set the body if provided post via Input has a body', (done) => {
      const body = [
        {
          type: ELEMENT_TYPES.Paragraph,
          data: {
            text: 'asdf'
          }
        }
      ];
      const editor = component.editor;
      component.story = new Post();
      component.story.bodyJSON = body;
      component.editor$ = of({
        ...initialEditorState,
        status: EDITOR_STATUS.Loaded,
      });
      component.ngOnInit();
      const blocks = editor.blocks;
      const clearSpy = spyOn(blocks, 'clear').and.callThrough();
      const renderSpy = spyOn(blocks, 'render').and.callThrough();

      editor.isReady.then(() => {
        expect(clearSpy).toHaveBeenCalled();
        expect(renderSpy).toHaveBeenCalledWith({blocks: body});
        done();
      });
    });
  });

  xdescribe('onBodyChange', () => {
    it('should trigger save method on the editor', (done) => {
      const editor = component.editor;
      const saver = editor.saver;
      const saveSpy = spyOn(saver, 'save').and.callThrough();
      component.onBodyChange();
      editor.isReady.then(() => {
        expect(saveSpy).toHaveBeenCalled();
        done();
      });
    });
    it('should dispatch EditorChange with story and editor', (done) => {
      const body = [
        {
          type: ELEMENT_TYPES.Paragraph,
          data: {
            text: 'asdf'
          }
        }
      ];
      component.story = new Post();
      const editor = component.editor;
      const saver = editor.saver;
      spyOn(saver, 'save').and.returnValue(of({blocks: body}).toPromise());
      component.onBodyChange();
      fixture.detectChanges();
      editor.isReady.then(() => {
        expect(component.story.bodyJSON).toEqual(body);
        expect(store.dispatch).toHaveBeenCalledWith(new EditorStoryPropertyChange({property: STORY_PROPERTIES.BodyJSON, value: body}));
        done();
      });
    });
  });
});
