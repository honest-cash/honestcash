import Story from '../models/story';
import {ITransaction, TRANSACTION_TYPES} from '../../../core/shared/models/transaction';
import {Upvote} from '../models/upvote';
import {Unlock} from '../models/unlock';

export interface StoryState {
  isLoading: boolean;
  isPropertySaving: boolean;
  pendingTransaction: {
    type: TRANSACTION_TYPES;
    transaction: ITransaction;
    data: Upvote | Unlock | Story;
    status: 'pending' | 'success' | 'fail'
  };
  story: Story;
  upvotes: Upvote[];
  unlocks: Unlock[];
  comments: Story[];
  commentingOnStoryId: number;
}

export const initialStoryState: StoryState = {
  isLoading: true,
  isPropertySaving: false,
  pendingTransaction: undefined,
  story: undefined,
  upvotes: undefined,
  unlocks: undefined,
  comments: undefined,
  commentingOnStoryId: undefined,
};
