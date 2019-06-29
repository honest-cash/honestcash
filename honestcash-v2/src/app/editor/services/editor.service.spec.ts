import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {mock} from '../../../../mock';
import {of} from 'rxjs';
import {EditorService} from './editor.service';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from '../../app.states';
import {HttpService} from '../../../core';
import Story from '../../story/models/story';
import {RouterTestingModule} from '@angular/router/testing';
import {localStorageProvider, LocalStorageToken} from '../../../core/shared/helpers/local-storage.helper';
import {API_ENDPOINTS} from '../shared/editor.endpoints';
import {EDITOR_STORY_PROPERTIES} from '../shared/editor.story-properties';
import {ELEMENT_TYPES} from '../shared/json-to-html';
import {HttpHeaders} from '@angular/common/http';
import {ContentTypeFormDataHeader} from '../../../core/http/header.interceptor';

describe('EditorService', () => {
  let editorService: EditorService;
  let httpServiceMock: HttpService;

  beforeEach(async () => {
    httpServiceMock = mock(HttpService);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        StoreModule.forRoot(reducers, {metaReducers}),
      ],
      providers: [
        EditorService,
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        {provide: LocalStorageToken, useFactory: localStorageProvider},
        {provide: HttpService, useValue: httpServiceMock},
      ]
    });
    httpServiceMock = TestBed.get(HttpService);
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
        getPostSuccess: new Story(),
      };
      (<jasmine.Spy>httpServiceMock.get).and.returnValue(of(mocks.getPostSuccess));
      // Act
      editorService.getPost(mocks.id).subscribe((response: Story) => {
        // Assert
        expect(httpServiceMock.get)
        .toHaveBeenCalledWith(API_ENDPOINTS.getPost(mocks.id));
        done();
      });
    });
  });

  describe('loadPostDraft', () => {
    it('should make API request to postDraft endpoint if context has postId provided', (done) => {
      const mocks = {
        id: 1,
        getPostSuccess: new Story(),
      };
      (<jasmine.Spy>httpServiceMock.get).and.returnValue(of(mocks.getPostSuccess));
      // Act
      editorService.loadPostDraft({postId: mocks.id}).subscribe((response: Story) => {
        // Assert
        expect(httpServiceMock.get)
          .toHaveBeenCalledWith(API_ENDPOINTS.postDraft(mocks.id));
        done();
      });
    });
    it('should make API request to commentDraft endpoint if context has parentPostId provided', (done) => {
      const mocks = {
        id: 1,
        getPostSuccess: new Story(),
      };
      (<jasmine.Spy>httpServiceMock.get).and.returnValue(of(mocks.getPostSuccess));
      // Act
      editorService.loadPostDraft({parentPostId: mocks.id}).subscribe((response: Story) => {
        // Assert
        expect(httpServiceMock.get)
          .toHaveBeenCalledWith(API_ENDPOINTS.commentDraft(mocks.id));
        done();
      });
    });
    it('should make API request to draft endpoint if NO id is provided', (done) => {
      const mocks = {
        getPostSuccess: new Story(),
      };
      (<jasmine.Spy>httpServiceMock.get).and.returnValue(of(mocks.getPostSuccess));
      // Act
      editorService.loadPostDraft().subscribe((response: Story) => {
        // Assert
        expect(httpServiceMock.get)
          .toHaveBeenCalledWith(API_ENDPOINTS.draft());
        done();
      });
    });
  });

  describe('savePostProperty', () => {
    describe('should successfully', () => {
      it('make API request to savePostProperty endpoint with correct property when property is BodyAndTitle', (done) => {
        const mocks = {
          getPostSuccess: {
            ...new Story(),
            id: 1,
            title: 'test',
            bodyJSON: [
              {
                type: ELEMENT_TYPES.Paragraph,
                data: {
                  text: 'asdf',
                }
              }
            ]
          },
          property: EDITOR_STORY_PROPERTIES.BodyAndTitle,
        };
        (<jasmine.Spy>httpServiceMock.put).and.returnValue(of(mocks.getPostSuccess));
        // Act
        editorService.savePostProperty(mocks.getPostSuccess, mocks.property).subscribe((response: Story) => {
          // Assert
          expect(httpServiceMock.put)
            .toHaveBeenCalledWith(
              API_ENDPOINTS.savePostProperty(mocks.getPostSuccess, mocks.property),
              {title: mocks.getPostSuccess.title, bodyJSON: mocks.getPostSuccess.bodyJSON}
            );
          done();
        });
      });
      it('make API request to savePostProperty endpoint with correct property when property is Hashtags', (done) => {
        const mocks = {
          getPostSuccess: {
            ...new Story(),
            id: 1,
            userPostHashtags: [
              {
                id: 1,
                hashtag: 'test',
                createdAt: (new Date()).toISOString(),
                updatedAt: (new Date()).toISOString(),
                userPostId: 43,
              }
            ]
          },
          property: EDITOR_STORY_PROPERTIES.Hashtags,
        };
        (<jasmine.Spy>httpServiceMock.put).and.returnValue(of(mocks.getPostSuccess));
        // Act
        editorService.savePostProperty(mocks.getPostSuccess, mocks.property).subscribe((response: Story) => {
          // Assert
          expect(httpServiceMock.put)
            .toHaveBeenCalledWith(
              API_ENDPOINTS.savePostProperty(mocks.getPostSuccess, mocks.property),
              {hashtags: editorService.transformTags(mocks.getPostSuccess.userPostHashtags)}
            );
          done();
        });
      });
      it('make API request to savePostProperty endpoint with correct property when property is PaidSection', (done) => {
        const mocks = {
          getPostSuccess: {
            ...new Story(),
            id: 1,
            hasPaidSection: true,
            paidSectionCost: 1,
            paidSectionLinebreak: 2
          },
          property: EDITOR_STORY_PROPERTIES.PaidSection,
        };
        (<jasmine.Spy>httpServiceMock.put).and.returnValue(of(mocks.getPostSuccess));
        // Act
        editorService.savePostProperty(mocks.getPostSuccess, mocks.property).subscribe((response: Story) => {
          // Assert
          expect(httpServiceMock.put)
            .toHaveBeenCalledWith(
              API_ENDPOINTS.savePostProperty(mocks.getPostSuccess, mocks.property),
              {
                hasPaidSection: mocks.getPostSuccess.hasPaidSection,
                paidSectionCost: mocks.getPostSuccess.paidSectionCost,
                paidSectionLinebreak: mocks.getPostSuccess.paidSectionLinebreak,
              }
            );
          done();
        });
      });
    });
  });

  describe('publishPost', () => {
    it('should make API request to the correct API endpoint with post as the body', (done) => {
      const mocks = {
        id: 1,
        putPostSuccess: new Story(),
      };
      (<jasmine.Spy>httpServiceMock.put).and.returnValue(of(mocks.putPostSuccess));
      // Act
      editorService.publishPost(mocks.putPostSuccess).subscribe((response: Story) => {
        // Assert
        expect(httpServiceMock.put)
          .toHaveBeenCalledWith(API_ENDPOINTS.publishPost(mocks.putPostSuccess), mocks.putPostSuccess);
        done();
      });
    });
  });

  describe('uploadImage', () => {
    it('should make API request to the correct API endpoint with the file in formData' +
      'and ContentTypeFormDataHeader in httpOptions', (done) => {
      const mocks = {
        file: new File([''], 'test', { type: 'image/jpeg' }),
        postSuccess: {
          files: [
            {
              url: 'asdf.com'
            }
          ]
        }
      };
      (<jasmine.Spy>httpServiceMock.post).and.returnValue(of(mocks.postSuccess));
      // Act
      editorService.uploadImage(mocks.file).then((response: any) => {
        const formData = new FormData();
        formData.append('files[]', mocks.file, mocks.file.name);
        const httpOptions = {
          headers: new HttpHeaders().set(ContentTypeFormDataHeader, '')
        };
        // Assert
        expect(httpServiceMock.post)
          .toHaveBeenCalledWith(API_ENDPOINTS.uploadImage(), formData, httpOptions);
        done();
      });
    });
  });

  describe('uploadRemoteImage', () => {
    it('should make API request to the correct API endpoint with the url as request body', (done) => {
      const url = 'test';
      const mocks = {
        postSuccess: {
          success: 1,
          file: {
            url,
          }
        }
      };
      (<jasmine.Spy>httpServiceMock.post).and.returnValue(of(mocks.postSuccess));
      // Act
      editorService.uploadRemoteImage(url).then((response: any) => {
        // Assert
        expect(httpServiceMock.post)
          .toHaveBeenCalledWith(API_ENDPOINTS.uploadRemoteImage(), {url});
        done();
      });
    });
  });

  describe('transformTags', () => {
    it('should join tags by comma', () => {
      const hashtag1 = 'test 1';
      const hashtag2 = 'test 2';
      const userPostHashtags = [
        {
          id: 1,
          hashtag: hashtag1,
          createdAt: (new Date()).toISOString(),
          updatedAt: (new Date()).toISOString(),
          userPostId: 43,
        },
        {
          id: 2,
          hashtag: hashtag2,
          createdAt: (new Date()).toISOString(),
          updatedAt: (new Date()).toISOString(),
          userPostId: 45,
        }
      ];

      expect(editorService.transformTags(userPostHashtags)).toBe(`${hashtag1},${hashtag2}`);

    });
  });

});
