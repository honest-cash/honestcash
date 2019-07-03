import {Injectable} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {TRANSACTION_TYPES} from '../../wallet/models/transaction';
import {StoryPropertySaveContext} from '../store/story.actions';
import Story from '../models/story';
import {Upvote} from '../models/upvote';
import {Unlock} from '../models/unlock';
import {mergeMap} from 'rxjs/operators';
import {StorySharedModule} from '../story-shared.module';
import {HttpService} from '../../../core/http/http.service';

export const API_ENDPOINTS = {
  getStory: (id: number) => `/v2/post/${id}`,
  getStoryUpvotes: (id: number) => `/post/${id}/upvotes`,
  getStoryUnlocks: (id: number) => `/post/${id}/unlocks`,
  getStoryComments: (id: number) => `/v2/post/${id}/responses`,
  saveComment: (id: number) =>  `/v2/draft/${id}/BodyAndTitle`,
  publishComment: (id: number) =>   `/v2/draft/${id}/publish`,
  upvoteStory: (id: number) => `/post/${id}/upvote`,
  unlockStory: (id: number) => `/post/${id}/unlock`,
};

@Injectable({providedIn: StorySharedModule})
export class StoryService {

  constructor(
    private http: HttpService,
  ) {
  }

  public getStoryWithoutDetails(id: number): Observable<Story> {
    return this.http.get<Story>(API_ENDPOINTS.getStory(id));
  }

  public getStoryDetails(id: number): Observable<[Story[], Upvote[], Unlock[]]> {
    return forkJoin(
      this.getStoryComments(id),
      this.getStoryUpvotes(id),
      this.getStoryUnlocks(id),
    );
  }

  public getStoryWithDetails(id: number): Observable<[Story, Story[], Upvote[], Unlock[]]> {
    return forkJoin(
      this.getStoryWithoutDetails(id),
      this.getStoryComments(id),
      this.getStoryUpvotes(id),
      this.getStoryUnlocks(id),
    );
  }

  public getStoryComments(id: number): Observable<Story[]> {
    return this.http.get<Story[]>(API_ENDPOINTS.getStoryComments(id));
  }

  public getStoryUpvotes(id: number): Observable<Upvote[]> {
    return this.http.get<Upvote[]>(API_ENDPOINTS.getStoryUpvotes(id));
  }

  public getStoryUnlocks(id: number): Observable<Unlock[]> {
    return this.http.get<Unlock[]>(API_ENDPOINTS.getStoryUnlocks(id));
  }

  public loadProperty(payload: StoryPropertySaveContext): Observable<Story[] | Upvote[] | [Unlock[], Story]> {
    if (payload.property === TRANSACTION_TYPES.Upvote) {
      return this.getStoryUpvotes(payload.transaction.postId);
    } else if (payload.property === TRANSACTION_TYPES.Unlock) {
      return forkJoin(
        this.getStoryUnlocks(payload.transaction.postId),
        this.getStoryWithoutDetails(payload.transaction.postId)
      );
    } else if (payload.property === TRANSACTION_TYPES.Comment) {
      return this.getStoryComments(payload.transaction.postId);
    }
  }

  public saveProperty(payload: StoryPropertySaveContext) {
    if (payload.property === TRANSACTION_TYPES.Upvote) {
      return this.http.post(API_ENDPOINTS.upvoteStory(payload.transaction.postId), payload.transaction);
    } else if (payload.property === TRANSACTION_TYPES.Unlock) {
      return this.http.post(API_ENDPOINTS.unlockStory(payload.transaction.postId), payload.transaction);
    } else if (payload.property === TRANSACTION_TYPES.Comment) {
      const requestBody = {
        title: (payload.data as Story).title,
        bodyJSON: (payload.data as Story).bodyJSON
      };
      return this.http.post(API_ENDPOINTS.saveComment(payload.transaction.postId), requestBody)
        .pipe(
          mergeMap(() => this.http.post(API_ENDPOINTS.publishComment(payload.transaction.postId), payload.data as Story))
        );
    }
  }

}
