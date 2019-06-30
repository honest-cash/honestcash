import Story from '../models/story';
import {FailedResponse} from '../../auth/models/authentication';
import {Action} from '@ngrx/store';
import {ITransaction, TRANSACTION_TYPES} from '../../../core/shared/models/transaction';
import {Unlock} from '../models/unlock';
import {Upvote} from '../models/upvote';

export interface StoryPropertySaveContext {
  data: Upvote | Unlock | Story;
  property: TRANSACTION_TYPES;
  transaction: ITransaction;
}

export enum StoryActionTypes {
  STORY_LOAD = '[Story] Load',
  STORY_LOAD_SUCCESS = '[Story] Load Success',
  STORY_LOAD_FAILURE = '[Story] Load Failure',
  STORY_PROPERTY_SAVE = '[Story] Property Save',
  STORY_PROPERTY_SAVE_SUCCESS = '[Story] Property Save Success',
  STORY_PROPERTY_SAVE_FAILURE = '[Story] Property Failure',
}

export class StoryLoad implements Action {
  public readonly type = StoryActionTypes.STORY_LOAD;

  constructor(public payload: number) {
  }
}

export class StoryLoadSuccess implements Action {
  public readonly type = StoryActionTypes.STORY_LOAD_SUCCESS;

  constructor(public payload: any[]) {
  }
}

export class StoryLoadFailure implements Action {
  public readonly type = StoryActionTypes.STORY_LOAD_FAILURE;

  constructor(public payload: FailedResponse) {
  }
}

export class StoryPropertySave implements Action {
  public readonly type = StoryActionTypes.STORY_PROPERTY_SAVE;

  constructor(public payload: StoryPropertySaveContext) {
  }
}

export class StoryPropertySaveSuccess implements Action {
  public readonly type = StoryActionTypes.STORY_PROPERTY_SAVE_SUCCESS;

  constructor(public payload: {story: Story, property: TRANSACTION_TYPES}) {
  }
}

export class StoryPropertySaveFailure implements Action {
  public readonly type = StoryActionTypes.STORY_PROPERTY_SAVE_FAILURE;

  constructor(public payload: FailedResponse) {
  }
}

export type All =
  | StoryLoad
  | StoryLoadSuccess
  | StoryLoadFailure
  | StoryPropertySave
  | StoryPropertySaveSuccess
  | StoryPropertySaveFailure;
