import Story from '../models/story';
import {STORY_PROPERTIES} from './story.actions';
import {ITransaction} from '../../../core/shared/models/transaction';
import {Upvote} from '../models/upvote';
import {Unlock} from '../models/unlock';

export interface StoryState {
  isLoading: boolean;
  isPropertySaving: boolean;
  pendingTransaction: {
    type: STORY_PROPERTIES;
    transaction: ITransaction;
    data: Upvote | Unlock | Story;
    status: 'pending' | 'success' | 'fail'
  };
  story: Story;
  upvotes: Upvote[];
  unlocks: Unlock[];
  comments: Story[];
}

export const initialStoryState: StoryState = {
  isLoading: true,
  isPropertySaving: false,
  pendingTransaction: undefined,
  story: undefined,
  upvotes: undefined,
  unlocks: undefined,
  comments: undefined,
};
