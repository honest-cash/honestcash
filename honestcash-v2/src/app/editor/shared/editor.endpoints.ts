import Story from '../../story/models/story';
import {EDITOR_STORY_PROPERTIES} from './editor.story-properties';

export const API_ENDPOINTS = {
  getPost: (id: number) => `/v2/post/${id}`,
  postDraft: (id: number) => `/v2/post/${id}`,
  commentDraft: (id: number) => `/v2/draft?parentPostId=${id}`,
  draft: () => `/v2/draft`,
  savePostProperty: (p: Story, property: EDITOR_STORY_PROPERTIES) => `/v2/draft/${p.id}/${property}`,
  publishPost: (p: Story) => `/v2/draft/${p.id}/publish`,
  uploadImage: () => `/upload/image`,
  uploadRemoteImage: () => `/upload/image/remote`
};
