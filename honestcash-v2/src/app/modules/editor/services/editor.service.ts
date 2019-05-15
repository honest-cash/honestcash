import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Post from '../../../core/models/post';
import {HttpService} from '../../../core';
import {EditorModule} from '../editor.module';

export interface DraftContext {
  parentPostId?: number;
  postId?: number;
}

export const API_ENDPOINTS = {
  getPost: (id: number) => `/post/${id}`,
  draft: (c: DraftContext = {}) =>
    c.parentPostId ? `/draft?parentPostId=${c.parentPostId}` : c.postId ? `/post/${c.postId}` : '/draft',
  newDraft: () => `/draft`,
  savePostProperty: (p: Post, property: 'title' | 'body' | 'hashtags' | 'paidSection') => `/draft/${p.id}/${property}`,
  saveDraft: (p: Post) => `/draft/${p.id}/body`,
  publishPost: (p: Post) => `/draft/${p.id}/publish`
};

@Injectable({
  providedIn: EditorModule
})
export class EditorService {
  constructor(private http: HttpService) {}

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(API_ENDPOINTS.getPost(id));
  }

  loadPostDraft(draftContext: DraftContext): Observable<Post> {
    return this.http.get<Post>(API_ENDPOINTS.draft(draftContext));
  }

  loadNewPostDraft(): Observable<Post> {
    return this.http.post<Post>(API_ENDPOINTS.newDraft(), {});
  }

  savePostProperty(post: Post, property: 'title' | 'body' | 'hashtags' | 'paidSection'): Observable<Post> {
    return this.http.put<Post>(API_ENDPOINTS.savePostProperty(post, property), post);
  }

  saveDraft(post: Post): Observable<Post> {
    return this.http.put<Post>(API_ENDPOINTS.saveDraft(post), {
      body: post.body
    });
  }

  publishPost(post: Post): Observable<Post> {
    return this.http.put<Post>(API_ENDPOINTS.publishPost(post), post);
  }
}
