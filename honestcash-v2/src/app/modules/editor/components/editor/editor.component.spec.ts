import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditorComponent} from './editor.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../../shared/mocks/app.states.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EditorService} from '../../services/editor.service';
import {mock} from '../../../../../../mock';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../../app.states';
import {initialState as initialEditorState} from '../../../../store/editor/editor.state';
import Story from '../../../../shared/models/post';
import {EDITOR_EDITING_MODES} from '../header/header.component';
import {ELEMENT_TYPES} from '../../shared/json-to-html';
import {EditorLoad, EditorStoryPropertyChange} from '../../../../store/editor/editor.actions';
import {STORY_PROPERTIES} from '../../shared/editor.story-properties';
import {of} from 'rxjs';
import {ScriptService} from 'ngx-script-loader';
import {editorScriptPaths} from '../../shared/editor.scripts-path';
import {EditorConfig} from '@editorjs/editorjs/types/configs';
import Paragraph from '@editorjs/paragraph';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let mockEditorService: EditorService;
  let store: MockStore<AppStates>;
  let scriptService: ScriptService;

  beforeEach(async(() => {
    mockEditorService = mock(EditorService);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgbModule,
      ],
      declarations: [EditorComponent],
      providers: [
        ScriptService,
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
    scriptService = TestBed.get(ScriptService);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('constructor', () => {
    it('should have editingMode UNDEFINED when not provided via Input', () => {
      expect(component.editingMode).toBeUndefined();
    });
    it('should have editingMode DEFINED when provided via Input', () => {
      component.editingMode = EDITOR_EDITING_MODES.Write;
      expect(component.editingMode).toBeDefined();
    });
    it('should have hasEditorInitialized as false', () => {
      expect(component.hasEditorInitialized).toBeFalsy();
    });
    it('should have hasEditorInitStarted as false', () => {
      expect(component.hasEditorInitStarted).toBeFalsy();
    });
    it('should have shouldEditorAllowTitleAndCustomElements as false', () => {
      expect(component.shouldEditorAllowTitleAndCustomElements).toBeFalsy();
    });
    it('should have EditorJS variable UNDEFINED', () => {
      expect(component.editor).toBeUndefined();
    });
  });

  describe('ngOnInit', () => {
    it('should call initEditor if story provided by store has properties', () => {
      const initEditorSpy = spyOn(component, 'initEditor');
      store.setState({
        ...initialAppStates,
        editor: {
          ...initialEditorState,
          story: {
            ...new Story(),
            title: 'test'
          }
        }
      });
      component.ngOnInit();
      expect(initEditorSpy).toHaveBeenCalled();
    });
  });

  describe('onBodyChange', () => {
    it('should trigger save method on the editor and dispatch EditorPropertyChange with property BodyJSON and bodyJSON as value', (done) => {
      component.story = {
        ...new Story(),
        bodyJSON: [
          {
            type: ELEMENT_TYPES.Paragraph,
            data: {
              text: 'test'
            }
          }
        ]
      };
      component.editor = {
        saver: {
          save: () => of(component.story.bodyJSON).toPromise()
        }
      };
      const saver = component.editor.saver;
      const saveSpy = spyOn(saver, 'save').and.callThrough();
      component.onBodyChange();
      expect(saveSpy).toHaveBeenCalled();
      component.editor.saver.save().then(() => {
        expect(store.dispatch).toHaveBeenCalledWith(new EditorStoryPropertyChange({property: STORY_PROPERTIES.BodyJSON, value: component.story.bodyJSON}));
        done();
      });
    });
    /*it('should dispatch EditorPropertyChange property and value', (done) => {
      const body = [
        {
          type: ELEMENT_TYPES.Paragraph,
          data: {
            text: 'asdf'
          }
        }
      ];
      component.story = new Story();
      component.initEditor();
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
    });*/
  });

  describe('onTitleBlur', () => {
    beforeEach(() => {
      component.story = new Story();
      component.updatedTitle = 'test';
      component.titleElement = {
        nativeElement: {
          innerHTML: ''
        }
      }
      component.onTitleBlur();
    });
    it('should set story.title and titleElement.nativeElement.innerHTML to updatedTitle', () => {
      expect(component.story.title).toBe(component.updatedTitle);
      expect(component.titleElement.nativeElement.innerHTML).toBe(component.updatedTitle);
    });
    it('should dispatch EditorStoryPropertyChange with Title as property and title as value', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new EditorStoryPropertyChange({property: STORY_PROPERTIES.Title, value: component.story.title}));
    });
  });

  describe('onTitleChange', () => {
    it('should set updatedTitle to event.target.innerText', () => {
      const innerText = 'test';
      component.onTitleChange({target: {innerText}});
      expect(component.updatedTitle).toBe(innerText);
    });
  });
  describe('uploadImage', () => {
    it('should call editorService.uploadImage with provided file', () => {
      const file = new File([''], 'test', { type: 'image/jpeg' });
      component.uploadImage(file);
      expect(mockEditorService.uploadImage).toHaveBeenCalledWith(file);
    });
  });
  describe('uploadRemoteImage', () => {
    it('should call editorService.uploadRemoteImage with provided file', () => {
      const url = 'http://test.com/a.jpeg';
      component.uploadRemoteImage(url);
      expect(mockEditorService.uploadRemoteImage).toHaveBeenCalledWith(url);
    });
  });
  describe('initEditor', () => {

  });
  describe('onEditorReady', () => {
    it('should dispatch EditorLoad and set hasEditorInitialized to true', () => {
      component.onEditorReady();
      expect(component.hasEditorInitialized).toBeTruthy();
      expect(store.dispatch).toHaveBeenCalledWith(new EditorLoad());
    });
  });
  describe('getEditorScripts', () => {
    it('should return scripts with ONLY paragraph if shouldEditorAllowTitleAndCustomElements is NOT enabled', () => {
      const scripts = component.getEditorScripts();
      expect(scripts.length).toEqual(1);
      expect(scripts[0]).toEqual(scriptService.loadScript(editorScriptPaths.plugins.paragraph));
    });
    it('should return scripts with with paragraph, header, image, embed if shouldEditorAllowTitleAndCustomElements is enabled', () => {
      component.shouldEditorAllowTitleAndCustomElements = true;
      const scripts = component.getEditorScripts();
      expect(scripts.length).toEqual(4);
      expect(scripts).toEqual([
        scriptService.loadScript(editorScriptPaths.plugins.paragraph),
        scriptService.loadScript(editorScriptPaths.plugins.header),
        scriptService.loadScript(editorScriptPaths.plugins.image),
        scriptService.loadScript(editorScriptPaths.plugins.embed),
      ]);
    });
  });
  describe('getEditorConfig', () => {
    it('should have the correct config', (done) => {
      component.story = {
        ...new Story(),
        bodyJSON: [
          {
            type: ELEMENT_TYPES.Paragraph,
            data: {
              text: 'test'
            }
          }
        ]
      };

      component.editorPlaceholder = 'test';

      const expectedConfig = {
        holder: 'editor',
        initialBlock: 'paragraph',
        onChange: component.onBodyChange.bind(component),
        onReady: component.onEditorReady.bind(component),
        data: {
          blocks: component.story.bodyJSON
        },
        placeholder: component.editorPlaceholder,
        tools: {
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          }
        }
      };
      scriptService.loadScript(editorScriptPaths.plugins.paragraph).subscribe(() => {
        const config = component.getEditorConfig();
        expect(config.holder).toEqual(expectedConfig.holder);
        expect(config.initialBlock).toEqual(expectedConfig.initialBlock);
        expect(config.onChange.toString).toEqual(expectedConfig.onChange.toString);
        expect(config.onReady.toString).toEqual(expectedConfig.onReady.toString);
        expect(config.data).toEqual(expectedConfig.data);
        expect(config.placeholder).toEqual(expectedConfig.placeholder);
        expect(config.tools.paragraph.class.toString()).toEqual(expectedConfig.tools.paragraph.class.toString());
        done();
      });
    });
  });
  describe('setupEditorTitle', () => {
    describe('when story is defined, it', () => {
      it('should NOT set updatedTitle to story title if story title is empty', () => {
        component.story = new Story();
        const currentUpdatedTitle = component.updatedTitle;
        component.setupEditorTitle();
        expect(component.updatedTitle).toBe(currentUpdatedTitle);
      });
      it('should set updatedTitle to story title if story title is NOT empty', () => {
        component.story = new Story();
        component.story.title = 'test';
        const currentUpdatedTitle = component.updatedTitle;
        component.setupEditorTitle();
        expect(component.updatedTitle).toBe(component.story.title);
      });
      it('should set titleElement.nativeElement.innerHTML to updatedTitle if titleElement.nativeElement is defined', () => {
        component.story = new Story();
        component.story.title = 'test';
        component.titleElement = {
          nativeElement: {
            innerHTML: '',
          }
        };
        component.setupEditorTitle();
        expect(component.titleElement.nativeElement.innerHTML).toBe(component.story.title);
      });
    });
    describe('when story is NOT defined but there is a parentPost.title', () => {
      it('should set titleElement.nativeElement.innerHTML to updatedTitle if titleElement.nativeElement is defined', () => {
        component.story = new Story();
        component.story.parentPost = {
          ...new Story(),
          title: 'test',
        };
        component.setupEditorTitle();
        expect(component.story.title).toBe(`RE: ${component.story.parentPost.title}`);
      });
    });
  });
});
