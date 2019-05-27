import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {mock} from '../../../../../mock';
import {of} from 'rxjs';
import {API_ENDPOINTS, EditorService, STORY_PROPERTIES} from './editor.service';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from '../../../app.states';
import {HttpService} from '../../../core';
import Post from '../../../core/models/post';
import {RouterTestingModule} from '@angular/router/testing';

xdescribe('EditorService', () => {
  let editorService: EditorService;
  let httpServiceMock: HttpService;

  beforeEach(() => {
    httpServiceMock = mock(HttpService);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        StoreModule.forRoot(reducers, {metaReducers}),
      ],
      providers: [
        EditorService,
        {provide: HttpService, useValue: httpServiceMock}
      ]
    });
    editorService = TestBed.get(EditorService);
  });

  afterEach(() => {
    // Cleanup
  });

  describe('instance', () => {
    it('should have been initialized', () => {
      expect(editorService).toBeDefined();
    });
  });

  describe('getPost', () => {
    it('should make API request to the correct API endpoint with id of the post', (done) => {
      const mocks = {
        id: 1,
        getPostSuccess: new Post(),
      };
      (<jasmine.Spy>httpServiceMock.get).and.returnValue(of(mocks.getPostSuccess));
      // Act
      editorService.getPost(mocks.id).subscribe((response: Post) => {
        // Assert
        expect(httpServiceMock.get)
        .toHaveBeenCalledWith(API_ENDPOINTS.getPost(mocks.id));
        done();
      });

    });

    it('should get a Post as a response', (done) => {
      const mocks = {
        id: 1,
        getPostSuccess: new Post(),
      };
      (<jasmine.Spy>httpServiceMock.get).and.returnValue(of(mocks.getPostSuccess));
      // Act
      editorService.getPost(mocks.id).subscribe((response: Post) => {
        // Assert
        expect(response).toBe(mocks.getPostSuccess);
        done();
      });

    });
  });

  describe('loadPostDraft', () => {
    const mocks = {
      context: {
        parentPostId: 2,
        postId: 1
      },
      loadPostDraftSuccess: new Post(),
    };
    it('should make API request to the correct API endpoint if NO context is provided', (done) => {

      (<jasmine.Spy>httpServiceMock.get).and.returnValue(of(mocks.loadPostDraftSuccess));
      // Act
      editorService.loadPostDraft({}).subscribe((response: Post) => {
        // Assert
        expect(httpServiceMock.get)
        .toHaveBeenCalledWith(API_ENDPOINTS.draft({}));
        done();
      });

    });

    it('should make API request to the correct API endpoint if ONLY parentPostId is provided in context', (done) => {

      (<jasmine.Spy>httpServiceMock.get).and.returnValue(of(mocks.loadPostDraftSuccess));
      // Act
      editorService.loadPostDraft({parentPostId: mocks.context.parentPostId}).subscribe((response: Post) => {
        // Assert
        expect(httpServiceMock.get)
        .toHaveBeenCalledWith(API_ENDPOINTS.draft({parentPostId: mocks.context.parentPostId}));
        done();
      });

    });

    it('should make API request to the correct API endpoint if BOTH parentPostId and postId are provided in context', (done) => {

      (<jasmine.Spy>httpServiceMock.get).and.returnValue(of(mocks.loadPostDraftSuccess));
      // Act
      editorService.loadPostDraft(mocks.context).subscribe((response: Post) => {
        // Assert
        expect(httpServiceMock.get)
        .toHaveBeenCalledWith(API_ENDPOINTS.draft(mocks.context));
        done();
      });

    });

    it('should get a Post as a response NO matter the context', (done) => {
      (<jasmine.Spy>httpServiceMock.get).and.returnValue(of(mocks.loadPostDraftSuccess));
      // Act
      editorService.loadPostDraft({}).subscribe((response: Post) => {
        // Assert
        expect(response).toBe(mocks.loadPostDraftSuccess);
        done();
      });

    });
  });

  describe('loadNewPostDraft', () => {
    const mocks = {
      loadNewPostDraftSuccess: new Post(),
    };
    it('should make API request to the correct API endpoint with EMPTY body', (done) => {

      (<jasmine.Spy>httpServiceMock.post).and.returnValue(of(mocks.loadNewPostDraftSuccess));
      // Act
      editorService.loadNewPostDraft().subscribe((response: Post) => {
        // Assert
        expect(httpServiceMock.post)
        .toHaveBeenCalledWith(API_ENDPOINTS.newDraft(), {});
        done();
      });

    });

    it('should get a Post as a response NO matter the context', (done) => {
      (<jasmine.Spy>httpServiceMock.post).and.returnValue(of(mocks.loadNewPostDraftSuccess));
      // Act
      editorService.loadNewPostDraft().subscribe((response: Post) => {
        // Assert
        expect(response).toBe(mocks.loadNewPostDraftSuccess);
        done();
      });

    });
  });

  describe('savePostProperty', () => {
    const mocks = {
      context: {
        post: new Post(),
      },
      savePostPropertySuccess: new Post(),
    };
    it('should make API request to the correct API endpoint with Post body', (done) => {

      (<jasmine.Spy>httpServiceMock.put).and.returnValue(of(mocks.savePostPropertySuccess));
      // Act
      editorService.savePostProperty(mocks.context.post, STORY_PROPERTIES.Title).subscribe((response: Post) => {
        // Assert
        expect(httpServiceMock.put)
        .toHaveBeenCalledWith(API_ENDPOINTS.savePostProperty(mocks.context.post, 'title'), mocks.context.post);
        done();
      });

    });

    it('should get a Post as a response', (done) => {
      (<jasmine.Spy>httpServiceMock.put).and.returnValue(of(mocks.savePostPropertySuccess));
      // Act
      editorService.savePostProperty(mocks.context.post, STORY_PROPERTIES.Title).subscribe((response: Post) => {
        // Assert
        expect(response).toBe(mocks.savePostPropertySuccess);
        done();
      });

    });
  });

  describe('publishPost', () => {
    const mocks = {
      context: {
        post: new Post(),
      },
      publishPostSuccess: new Post(),
    };
    it('should make API request to the correct API endpoint with Post as request body', (done) => {
      (<jasmine.Spy>httpServiceMock.put).and.returnValue(of(mocks.publishPostSuccess));
      // Act
      editorService.publishPost(mocks.context.post).subscribe((response: Post) => {
        // Assert
        expect(httpServiceMock.put)
        .toHaveBeenCalledWith(API_ENDPOINTS.publishPost(mocks.context.post), mocks.context.post);
        done();
      });

    });

    it('should get a Post as a response', (done) => {
      (<jasmine.Spy>httpServiceMock.put).and.returnValue(of(mocks.publishPostSuccess));
      // Act
      editorService.publishPost(mocks.context.post).subscribe((response: Post) => {
        // Assert
        expect(response).toBe(mocks.publishPostSuccess);
        done();
      });

    });
  });

});
