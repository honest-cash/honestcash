import Post from '../../../shared/models/post';
import {STORY_PROPERTIES} from './editor.story-properties';
import {DraftContext} from '../interfaces';

export const API_ENDPOINTS = {
  getPost: (id: number) => `/v2/post/${id}`,
  getRelativePost: (id: number) => `/v2/post/relative/${id}`,
  draft: (c: DraftContext = {}) =>
    c.parentPostId ? `/v2/draft?parentPostId=${c.parentPostId}` : c.postId ? `/v2/post/${c.postId}` : '/v2/draft',
  newDraft: () => `/v2/draft`,
  savePostProperty: (p: Post, property: STORY_PROPERTIES) => `/v2/draft/${p.id}/${property}`,
  saveDraft: (p: Post) => `/v2/draft/${p.id}/body`,
  publishPost: (p: Post) => `/v2/draft/${p.id}/publish`,
  uploadImage: () => `/upload/image`,
  uploadRemoteImage: () => `/upload/image/remote`
};
