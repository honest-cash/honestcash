import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Observable} from 'rxjs';
import Story from '../../story/models/story';
import {EmptyResponse, FailedResponse} from '../../auth/models/authentication';
import Hashtag from '../models/hashtag';
import {HttpHeaders} from '@angular/common/http';
import {ContentTypeFormDataHeader} from '../../../core/http/header.interceptor';
import {LocalStorageToken} from '../../../core/shared/helpers/local-storage.helper';
import {API_ENDPOINTS} from '../shared/editor.endpoints';
import {EDITOR_STORY_PROPERTIES} from '../shared/editor.story-properties';
import {StoryLoadContext, UploadImageResponse} from '../shared/interfaces';
import {isPlatformBrowser} from '@angular/common';
import {Block} from '../shared/json-to-html';
import {HttpService} from '../../../core/http/http.service';

@Injectable()
export class EditorService {
  private readonly isPlatformBrowser: boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private http: HttpService
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
  }

  public getPost(id: number): Observable<Story> {
    return this.http.get<Story>(API_ENDPOINTS.getPost(id));
  }

  public loadPostDraft(storyLoadContext?: StoryLoadContext): Observable<Story> {
    if (storyLoadContext) {
      if (storyLoadContext.postId) {
        return this.http.get<Story>(API_ENDPOINTS.postDraft(storyLoadContext.postId));
      }
      if (storyLoadContext.parentPostId) {
        return this.http.get<Story>(API_ENDPOINTS.commentDraft(storyLoadContext.parentPostId));
      }
    }
    return this.http.get<Story>(API_ENDPOINTS.draft());
  }

  public savePostProperty(post: Story, property: EDITOR_STORY_PROPERTIES): Observable<EmptyResponse | FailedResponse> {
    const body: {
      hashtags?: string;
      hasPaidSection?: boolean;
      paidSectionLinebreak?: number;
      paidSectionCost?: number;
      title?: string;
      bodyJSON?: Block[];
    } = {};
    if (property === EDITOR_STORY_PROPERTIES.Hashtags) {
      body.hashtags = this.transformTags(<Hashtag[]>post.userPostHashtags);
    }
    if (property === EDITOR_STORY_PROPERTIES.PaidSection) {
      body.hasPaidSection = post.hasPaidSection;
      body.paidSectionLinebreak = post.paidSectionLinebreak;
      body.paidSectionCost = post.paidSectionCost;
    }
    if (property === EDITOR_STORY_PROPERTIES.BodyAndTitle) {
      body.title = post.title;
      body.bodyJSON = post.bodyJSON;
    }
    return this.http.put<Story>(API_ENDPOINTS.savePostProperty(post, property), body);
  }

  public publishPost(post: Story): Observable<Story | FailedResponse> {
    return this.http.put<Story>(API_ENDPOINTS.publishPost(post), post);
  }

  public uploadImage(image: File): Promise<UploadImageResponse> {
    const formData = new FormData();
    formData.append('files[]', image, image.name);

    const httpOptions = {
      headers: new HttpHeaders().set(ContentTypeFormDataHeader, '')
    };

    return this.http.post<UploadImageResponse>(API_ENDPOINTS.uploadImage(), formData, httpOptions)
      .toPromise()
      .then((response: any) => {
        return {
          success: 1,
          file: {
            url: response.files[0].url
          }
        } as UploadImageResponse;
      });
  }

  public uploadRemoteImage(url: string): Promise<UploadImageResponse> {
    return this.http.post<UploadImageResponse>(API_ENDPOINTS.uploadRemoteImage(), {url}).toPromise();
  }

  public transformTags(tags: Hashtag[]): string {
    return tags.map(h => h.hashtag).join(',');
  }
}
