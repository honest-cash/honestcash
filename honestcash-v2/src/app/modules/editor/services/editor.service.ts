import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Observable} from 'rxjs';
import Post from '../../../shared/models/post';
import {HttpService} from '../../../core';
import {EmptyResponse, FailedResponse} from '../../../shared/models/authentication';
import Hashtag from '../../../shared/models/hashtag';
import {HttpHeaders} from '@angular/common/http';
import {ContentTypeFormDataHeader} from '../../../core/http/header.interceptor';
import {LocalStorageToken} from '../../../core/helpers/localStorage';
import {API_ENDPOINTS} from '../shared/editor.endpoints';
import {STORY_PREVIEW_KEY, STORY_PROPERTIES} from '../shared/editor.story-properties';
import {StoryLoadContext, UploadImageResponse, UploadRemoteImageResponse} from '../interfaces';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private isPlatformBrowser: boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private http: HttpService
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
  }

  public getPost(id: number): Observable<Post> {
    return this.http.get<Post>(API_ENDPOINTS.getPost(id));
  }

  public getRelativePost(id: number) {
    return this.http.get<Post>(API_ENDPOINTS.getRelativePost(id));
  }

  public loadPostDraft(storyLoadContext?: StoryLoadContext): Observable<Post> {
    if (storyLoadContext.postId) {
      return this.http.get<Post>(API_ENDPOINTS.postDraft(storyLoadContext.postId));
    }
    if (storyLoadContext.parentPostId) {
      return this.http.get<Post>(API_ENDPOINTS.commentDraft(storyLoadContext.parentPostId));
    }
    return this.http.get<Post>(API_ENDPOINTS.draft());
  }

  public savePostProperty(post: Post, property: STORY_PROPERTIES): Observable<EmptyResponse | FailedResponse> {
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

  public publishPost(post: Post): Observable<Post | FailedResponse> {
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
