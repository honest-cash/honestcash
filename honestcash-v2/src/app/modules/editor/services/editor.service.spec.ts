import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {mock} from '../../../../../mock';
import {of} from 'rxjs';
import {API_ENDPOINTS} from './editor.service';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from '../../../app.states';
import {AppRoutingModule} from '../../../app-routing.module';
import {EditorService} from './editor.service';
import {HttpService} from '../../../core';
import Post from '../../../core/models/post';

describe('EditorService', () => {
  let postService: EditorService;
  let httpServiceMock: HttpService;

  beforeEach(() => {
    httpServiceMock = mock(HttpService);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppRoutingModule,
        StoreModule.forRoot(reducers, { metaReducers}),
      ],
      providers: [
        EditorService,
        {provide: HttpService, useValue: httpServiceMock}
      ]
    });
    postService = TestBed.get(EditorService);
  });

  afterEach(() => {
    // Cleanup
  });

  describe('instance', () => {
    it('should have been initialized', () => {
      expect(postService).toBeDefined();
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
      postService.getPost(mocks.id).subscribe((response: Post) => {
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
      postService.getPost(mocks.id).subscribe((response: Post) => {
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
      postService.loadPostDraft({}).subscribe((response: Post) => {
        // Assert
        expect(httpServiceMock.get)
          .toHaveBeenCalledWith(API_ENDPOINTS.draft({}));
        done();
      });

    });

    it('should make API request to the correct API endpoint if ONLY parentPostId is provided in context', (done) => {

      (<jasmine.Spy>httpServiceMock.get).and.returnValue(of(mocks.loadPostDraftSuccess));
      // Act
      postService.loadPostDraft({parentPostId: mocks.context.parentPostId}).subscribe((response: Post) => {
        // Assert
        expect(httpServiceMock.get)
          .toHaveBeenCalledWith(API_ENDPOINTS.draft({parentPostId: mocks.context.parentPostId}));
        done();
      });

    });

    it('should make API request to the correct API endpoint if BOTH parentPostId and postId are provided in context', (done) => {

      (<jasmine.Spy>httpServiceMock.get).and.returnValue(of(mocks.loadPostDraftSuccess));
      // Act
      postService.loadPostDraft(mocks.context).subscribe((response: Post) => {
        // Assert
        expect(httpServiceMock.get)
          .toHaveBeenCalledWith(API_ENDPOINTS.draft(mocks.context));
        done();
      });

    });

    it('should get a Post as a response NO matter the context', (done) => {
      (<jasmine.Spy>httpServiceMock.get).and.returnValue(of(mocks.loadPostDraftSuccess));
      // Act
      postService.loadPostDraft({}).subscribe((response: Post) => {
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
      postService.loadNewPostDraft().subscribe((response: Post) => {
        // Assert
        expect(httpServiceMock.post)
          .toHaveBeenCalledWith(API_ENDPOINTS.newDraft(), {});
        done();
      });

    });

    it('should get a Post as a response NO matter the context', (done) => {
      (<jasmine.Spy>httpServiceMock.post).and.returnValue(of(mocks.loadNewPostDraftSuccess));
      // Act
      postService.loadNewPostDraft().subscribe((response: Post) => {
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
      postService.savePostProperty(mocks.context.post, 'title').subscribe((response: Post) => {
        // Assert
        expect(httpServiceMock.put)
          .toHaveBeenCalledWith(API_ENDPOINTS.savePostProperty(mocks.context.post, 'title'), mocks.context.post);
        done();
      });

    });

    it('should get a Post as a response', (done) => {
      (<jasmine.Spy>httpServiceMock.put).and.returnValue(of(mocks.savePostPropertySuccess));
      // Act
      postService.savePostProperty(mocks.context.post, 'title').subscribe((response: Post) => {
        // Assert
        expect(response).toBe(mocks.savePostPropertySuccess);
        done();
      });

    });
  });

  describe('saveDraft', () => {
    const mocks = {
      context: {
        post: new Post(),
      },
      saveDraftSuccess: new Post(),
    };
    it('should make API request to the correct API endpoint with Post.body as request.body', (done) => {
      mocks.context.post.body = `Test Header`;
      (<jasmine.Spy>httpServiceMock.put).and.returnValue(of(mocks.saveDraftSuccess));
      // Act
      postService.saveDraft(mocks.context.post).subscribe((response: Post) => {
        // Assert
        expect(httpServiceMock.put)
          .toHaveBeenCalledWith(API_ENDPOINTS.saveDraft(mocks.context.post), { body: mocks.context.post.body });
        done();
      });

    });

    it('should get a Post as a response', (done) => {
      (<jasmine.Spy>httpServiceMock.put).and.returnValue(of(mocks.saveDraftSuccess));
      // Act
      postService.saveDraft(mocks.context.post).subscribe((response: Post) => {
        // Assert
        expect(response).toBe(mocks.saveDraftSuccess);
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
      postService.publishPost(mocks.context.post).subscribe((response: Post) => {
        // Assert
        expect(httpServiceMock.put)
          .toHaveBeenCalledWith(API_ENDPOINTS.publishPost(mocks.context.post), mocks.context.post);
        done();
      });

    });

    it('should get a Post as a response', (done) => {
      (<jasmine.Spy>httpServiceMock.put).and.returnValue(of(mocks.publishPostSuccess));
      // Act
      postService.publishPost(mocks.context.post).subscribe((response: Post) => {
        // Assert
        expect(response).toBe(mocks.publishPostSuccess);
        done();
      });

    });
  });


});
