import Story from '../../../shared/models/story';
import {STORY_PROPERTIES} from './editor.story-properties';

export const API_ENDPOINTS = {
  getPost: (id: number) => `/v2/post/${id}`,
  postDraft: (id: number) => `/v2/post/${id}`,
  commentDraft: (id: number) => `/v2/draft?parentPostId=${id}`,
  draft: () => `/v2/draft`,
  savePostProperty: (p: Story, property: STORY_PROPERTIES) => `/v2/draft/${p.id}/${property}`,
  saveDraft: (p: Story) => `/v2/draft/${p.id}/body`,
  publishPost: (p: Story) => `/v2/draft/${p.id}/publish`,
  uploadImage: () => `/upload/image`,
  uploadRemoteImage: () => `/upload/image/remote`
};
