import {StoryCommentDraftLoadContext} from '../store/story.actions';

export const API_ENDPOINTS = {
  getStory: (id: number) => `/v2/post/${id}`,
  getStoryUpvotes: (id: number) => `/post/${id}/upvotes`,
  getStoryUnlocks: (id: number) => `/post/${id}/unlocks`,
  getStoryComments: (id: number) => `/v2/post/${id}/responses`,
  loadCommentDraft: (payload: StoryCommentDraftLoadContext) => !payload.isLoadingSelf ?
    `/v2/draft?parentPostId=${payload.storyId}` :
    `/v2/post/${payload.storyId}`,
  saveComment: (id: number) => `/v2/draft/${id}/bodyAndTitle`,
  publishComment: (id: number) => `/v2/draft/${id}/publish`,
  upvoteStory: (id: number) => `/post/${id}/upvote`,
  unlockStory: (id: number) => `/post/${id}/unlock`,
};
