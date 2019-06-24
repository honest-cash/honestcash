import Post from '../../../shared/models/post';
import {STORY_PROPERTIES} from './editor.story-properties';
import {StoryLoadContext} from '../interfaces';

export const API_ENDPOINTS = {
  getPost: (id: number) => `/v2/post/${id}`,
  getRelativePost: (id: number) => `/v2/post/relative/${id}`,
  postDraft: (id: number) => `/v2/post/${id}`,
  commentDraft: (id: number) => `/v2/draft?parentPostId=${id}`,
  draft: () => `/v2/draft`,
  savePostProperty: (p: Post, property: STORY_PROPERTIES) => `/v2/draft/${p.id}/${property}`,
  saveDraft: (p: Post) => `/v2/draft/${p.id}/body`,
  publishPost: (p: Post) => `/v2/draft/${p.id}/publish`,
  uploadImage: () => `/upload/image`,
  uploadRemoteImage: () => `/upload/image/remote`
};
