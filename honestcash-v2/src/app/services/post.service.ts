import { Injectable } from '@angular/core';
import { Post } from '@app/shared/interfaces';
import { Observable } from 'rxjs';
import { HttpService } from '@app/core';

export interface DraftContext {
  parentPostId?: number;
  postId?: number;
}

const routes = {
  getPost: (id: number) => `/post/${id}`,
  draft: (c: DraftContext = {}) =>
    c.parentPostId ? `/draft?parentPostId=${c.parentPostId}` : c.postId ? `/post/${c.postId}` : '/draft',
  newDraft: () => `/draft`,
  savePostProperty: (p: Post, property: 'title' | 'body' | 'hashtags' | 'paidSection') => `/draft/${p.id}/${property}`,
  saveDraft: (p: Post) => `/draft/${p.id}/body`,
  publishPost: (p: Post) => `/draft/${p.id}/publish`
};

@Injectable()
export class PostService {
  constructor(private httpService: HttpService) {}

  getPost(id: number): Observable<Post> {
    return this.httpService.get<Post>(routes.getPost(id));
  }

  loadPostDraft(draftContext: DraftContext): Observable<Post> {
    return this.httpService.get<Post>(routes.draft(draftContext));
  }

  loadNewPostDraft(): Observable<Post> {
    return this.httpService.post<Post>(routes.newDraft(), {});
  }

  savePostProperty(post: Post, property: 'title' | 'body' | 'hashtags' | 'paidSection'): Observable<Post> {
    return this.httpService.put<Post>(routes.savePostProperty(post, property), post);
  }

  saveDraft(post: Post): Observable<Post> {
    return this.httpService.put<Post>(routes.saveDraft(post), {
      body: post.bodyMD
    });
  }

  publishPost(post: Post): Observable<Post> {
    return this.httpService.put<Post>(routes.publishPost(post), post);
  }
}
