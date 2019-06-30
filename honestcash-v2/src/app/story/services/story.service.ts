import {Injectable} from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import {HttpService} from '../../../core';
import {TRANSACTION_TYPES} from '../../../core/shared/models/transaction';
import {StoryPropertySaveContext} from '../store/story.actions';

export const API_ENDPOINTS = {
  getStory: (id: number) => `/v2/post/${id}`,
  getStoryUpvotes: (id: number) => `/post/${id}/upvotes`,
  getStoryUnlocks: (id: number) => `/post/${id}/unlocks`,
  getStoryComments: (id: number) => `/v2/post/${id}/responses`,
  upvoteStory: (id: number) => `/post/${id}/upvote`,
  unlockStory: (id: number) => `/post/${id}/unlock`,
};

@Injectable({providedIn: 'root'})
export class StoryService {

  constructor(
    private http: HttpService,
  ) {
  }

  public getStoryWithoutDetails(id: number): Observable<any> {
    return this.http.get(API_ENDPOINTS.getStory(id));
  }

  public getStoryWithDetails(id: number): Observable<any> {
    return forkJoin(
      this.getStoryWithoutDetails(id),
      this.getStoryComments(id),
      this.getStoryUpvotes(id),
      this.getStoryUnlocks(id),
    );
  }

  public getStoryComments(id: number): Observable<any> {
    return this.http.get(API_ENDPOINTS.getStoryComments(id));
  }

  public getStoryUpvotes(id: number): Observable<any> {
    return this.http.get(API_ENDPOINTS.getStoryUpvotes(id));
  }

  public getStoryUnlocks(id: number): Observable<any> {
    return this.http.get(API_ENDPOINTS.getStoryUnlocks(id));
  }

  public saveProperty(payload: StoryPropertySaveContext) {
    if (payload.property === TRANSACTION_TYPES.Upvote) {
      return this.http.post(API_ENDPOINTS.upvoteStory(payload.transaction.postId), payload.transaction);
    } else if (payload.property === TRANSACTION_TYPES.Unlock) {
      return this.http.post(API_ENDPOINTS.unlockStory(payload.transaction.postId), payload.transaction);
    } else if (payload.property === TRANSACTION_TYPES.Comment) {
      return of(payload.data);
    }
  }

}
