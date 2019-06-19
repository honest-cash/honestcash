import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import Post from '../../../shared/models/post';
import {HttpService} from '../../../core';
import {EmptyResponse} from '../../../shared/models/authentication';
import Hashtag from '../../../shared/models/hashtag';
import {HttpHeaders} from '@angular/common/http';
import {ContentTypeFormDataHeader} from '../../../core/http/header.interceptor';
import {LocalStorageToken} from '../../../core/helpers/localStorage';
import {API_ENDPOINTS} from '../shared/editor.endpoints';
import {STORY_PREVIEW_KEY, STORY_PROPERTIES} from '../shared/editor.story-properties';
import {DraftContext, UploadImageResponse, UploadRemoteImageResponse} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  constructor(
    @Inject(LocalStorageToken) private localStorage: Storage,
    private http: HttpService
  ) {
  }

  public getPost(id: number): Observable<Post> {
    return this.http.get<Post>(API_ENDPOINTS.getPost(id));
  }

  public getRelativePost(id: number) {
    return this.http.get<Post>(API_ENDPOINTS.getRelativePost(id));
  }

  public loadPostDraft(draftContext?: DraftContext): Observable<Post> {
    return this.http.get<Post>(API_ENDPOINTS.draft(draftContext));
  }

  public loadNewPostDraft(): Observable<Post> {
    return this.http.post<Post>(API_ENDPOINTS.newDraft(), {});
  }

  public savePostProperty(post: Post, property: STORY_PROPERTIES): Observable<EmptyResponse> {
    const body = {
      [property]: post[property]
    };
    if (property === STORY_PROPERTIES.Hashtags) {
      body.hashtags = this.transformTags(<Hashtag[]>post.userPostHashtags);
    }
    if (property === STORY_PROPERTIES.PaidSection) {
      body.hasPaidSection = post.hasPaidSection;
      body.paidSectionLinebreak = post.paidSectionLinebreak;
      body.paidSectionCost = post.paidSectionCost;
    }
    if (property === STORY_PROPERTIES.BodyAndTitle) {
      body.title = post.title;
      body.bodyJSON = post.bodyJSON;
    }
    return this.http.put<Post>(API_ENDPOINTS.savePostProperty(post, property), body);
  }

  public savePostPropertyLocally(property: STORY_PROPERTIES, value: any): void {
    if (!value) {
      return;
    }
    const data = this.localStorage.getItem(STORY_PREVIEW_KEY);
    if (data) {
      const newData = JSON.parse(data);
      newData[property] = value;
      return this.localStorage.setItem(STORY_PREVIEW_KEY, JSON.stringify(newData));
    }
    this.localStorage.setItem(STORY_PREVIEW_KEY, JSON.stringify({property: value}));
  }

  public savePostLocally(story: Post) {
    this.localStorage.setItem(STORY_PREVIEW_KEY, JSON.stringify(story));
  }

  public getLocallySavedPost(): Post {
    const data = JSON.parse(this.localStorage.getItem(STORY_PREVIEW_KEY));
    return data ? data : new Post();
  }

  public removeLocallySavedPost() {
    this.localStorage.removeItem(STORY_PREVIEW_KEY);
  }

  public publishPost(post: Post): Observable<Post> {
    return this.http.put<Post>(API_ENDPOINTS.publishPost(post), post);
  }

  public uploadImage(image: File): Observable<UploadImageResponse> {
    const formData = new FormData();
    formData.append('files[]', image, image.name);

    const httpOptions = {
      headers: new HttpHeaders().set(ContentTypeFormDataHeader, '')
    };

    return this.http.post<UploadImageResponse>(API_ENDPOINTS.uploadImage(), formData, httpOptions);
  }

  public uploadRemoteImage(url: string): Observable<UploadRemoteImageResponse> {
    return this.http.post<UploadRemoteImageResponse>(API_ENDPOINTS.uploadRemoteImage(), {url});
  }

  private transformTags(tags: Hashtag[]): string {
    return tags.map(h => h.hashtag).join(',');
  }
}
