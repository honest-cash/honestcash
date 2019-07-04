import Story from '../models/story';
import {Upvote} from '../models/upvote';
import {Unlock} from '../models/unlock';
import {TRANSACTION_TYPES} from '../../wallet/models/transaction';

export interface StoryState {
  isLoading: boolean;
  isLoadingProperties: {
    [TRANSACTION_TYPES.Upvote]: boolean;
    [TRANSACTION_TYPES.Unlock]: boolean;
    [TRANSACTION_TYPES.Comment]: boolean;
  };
  savingProperty: TRANSACTION_TYPES;
  isPropertySaving: boolean;
  story: Story;
  upvotes: Upvote[];
  unlocks: Unlock[];
  comments: Story[];
  commentParent: Story;
  hasCommentDraftLoaded: boolean;
  commentDraft: Story;
  scrollTo: number;
}

export const initialStoryState: StoryState = {
  isLoading: true,
  isLoadingProperties: {
    [TRANSACTION_TYPES.Upvote]: true,
    [TRANSACTION_TYPES.Unlock]: true,
    [TRANSACTION_TYPES.Comment]: true,
  },
  savingProperty: undefined,
  isPropertySaving: false,
  story: undefined,
  upvotes: undefined,
  unlocks: undefined,
  comments: undefined,
  commentParent: undefined,
  hasCommentDraftLoaded: false,
  commentDraft: undefined,
  scrollTo: undefined,
};
