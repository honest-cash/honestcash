import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import Post from '../../../shared/models/post';
import {HttpService} from '../../../core';
import {EmptyResponse} from '../../../shared/models/authentication';
import Hashtag from '../../../shared/models/hashtag';
import {HttpHeaders} from '@angular/common/http';
import {ContentTypeFormDataHeader} from '../../../core/http/header.interceptor';
import blankBody from '../../../store/editor/editor.story.body.initial-value';
import {LocalStorageToken} from '../../../core/helpers/localStorage';

export interface DraftContext {
  parentPostId?: number;
  postId?: number;
}

export interface UploadImageResponse {
  files: [{ url: string; }];
}

export interface UploadImageEditorExpectedResponse {
  success: number;
  file: {
    url: string;
  };
}

export const API_ENDPOINTS = {
  getPost: (id: number) => `/v2/post/${id}`,
  draft: (c: DraftContext = {}) =>
    c.parentPostId ? `/v2/draft?parentPostId=${c.parentPostId}` : c.postId ? `/v2/post/${c.postId}` : '/v2/draft',
  newDraft: () => `/v2/draft`,
  savePostProperty: (p: Post, property: STORY_PROPERTIES) => `/v2/draft/${p.id}/${property}`,
  saveDraft: (p: Post) => `/v2/draft/${p.id}/body`,
  publishPost: (p: Post) => `/v2/draft/${p.id}/publish`,
  uploadImage: () => `/upload/image`,
  uploadRemoteImage: () => `/v2/upload/image/remote`
};

export enum STORY_PROPERTIES {
  Title = 'title',
  Body = 'body',
  BodyJSON = 'bodyJSON',
  BodyAndTitle = 'bodyAndTitle',
  Hashtags = 'hashtags',
  PaidSection = 'paidSection',
  HasPaidSection = 'hasPaidSection',
  PaidSectionLinebreak = 'paidSectionLinebreak',
  PaidSectionCost = 'paidSectionCost',
}

export const STORY_PREVIEW_KEY = 'HC_STORY_PREVIEW_BODY';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  constructor(
    @Inject(LocalStorageToken) private localStorage: Storage,
    private http: HttpService
  ) {
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(API_ENDPOINTS.getPost(id));
  }

  loadPostDraft(draftContext?: DraftContext): Observable<Post> {
    return this.http.get<Post>(API_ENDPOINTS.draft(draftContext));
  }

  loadNewPostDraft(): Observable<Post> {
    return this.http.post<Post>(API_ENDPOINTS.newDraft(), {});
  }

  savePostProperty(post: Post, property: STORY_PROPERTIES): Observable<EmptyResponse> {
    const body = {
      [property]: post[property]
    };
    if (property === STORY_PROPERTIES.Hashtags && post.userPostHashtags.length > 0) {
      body.hashtags = this.transformTags(<Hashtag[]>post.userPostHashtags);
    }
    if (property === STORY_PROPERTIES.PaidSection) {
      body.hasPaidSection = true;
      body.paidSectionLinebreak = post.paidSectionLinebreak;
      body.paidSectionCost = post.paidSectionCost;
    }
    if (property === STORY_PROPERTIES.BodyAndTitle) {
      body.title = post.title;
      body.bodyJSON = post.bodyJSON;
    }
    return this.http.put<Post>(API_ENDPOINTS.savePostProperty(post, property), body);
  }

  publishPost(post: Post): Observable<Post> {
    return this.http.put<Post>(API_ENDPOINTS.publishPost(post), post);
  }

  uploadImage(image: File): Observable<UploadImageResponse> {
    const formData = new FormData();
    formData.append('files[]', image, image.name);

    const httpOptions = {
      headers: new HttpHeaders().set(ContentTypeFormDataHeader, '')
    };

    return this.http.post<UploadImageResponse>(API_ENDPOINTS.uploadImage(), formData, httpOptions);
  }

  downloadImageFromUrl(url: string) {
    return this.http.post<UploadImageResponse>(API_ENDPOINTS.uploadRemoteImage(), url);
  }

  setBlankBody(story: Post): Post {
    return {
      ...story,
      body: blankBody,
    };
  }

  savePostLocally(body: Post) {
    this.localStorage.setItem(STORY_PREVIEW_KEY, JSON.stringify(body));
  }

  getLocallySavedPost(): Post {
    return JSON.parse(this.localStorage.getItem(STORY_PREVIEW_KEY));
  }

  removeLocallySavedPost() {
    this.localStorage.removeItem(STORY_PREVIEW_KEY);
  }

  private transformTags(tags: Hashtag[]): string {
    return tags.map(h => h.hashtag).join(',');
  }
}
