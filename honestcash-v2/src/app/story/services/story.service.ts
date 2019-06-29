import {Injectable} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {HttpService} from '../../../core';

export const API_ENDPOINTS = {
  getStory: (id: number) => `/post/${id}`,
  getStoryUpvotes: (id: number) => `/post/${id}/upvotes`,
  getStoryUnlocks: (id: number) => `/post/${id}/unlocks`,
  getStoryComments: (id: number) => `/v2/post/${id}/responses`,
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

}
