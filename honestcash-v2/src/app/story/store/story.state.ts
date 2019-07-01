import Story from '../models/story';
import {Upvote} from '../models/upvote';
import {Unlock} from '../models/unlock';

export interface StoryState {
  isLoading: boolean;
  isPropertySaving: boolean;
  story: Story;
  upvotes: Upvote[];
  unlocks: Unlock[];
  comments: Story[];
  commentParent: Story;
  hasCommentDraftLoaded: boolean,
  commentDraft: Story;
}

export const initialStoryState: StoryState = {
  isLoading: true,
  isPropertySaving: false,
  story: undefined,
  upvotes: undefined,
  unlocks: undefined,
  comments: undefined,
  commentParent: undefined,
  hasCommentDraftLoaded: false,
  commentDraft: undefined,
};
