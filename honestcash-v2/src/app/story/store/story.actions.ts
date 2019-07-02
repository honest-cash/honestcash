import Story from '../models/story';
import {FailedResponse} from '../../auth/models/authentication';
import {Action} from '@ngrx/store';
import {ITransaction, TRANSACTION_TYPES} from '../../wallet/models/transaction';
import {Unlock} from '../models/unlock';
import {Upvote} from '../models/upvote';

export interface StoryPropertySaveContext {
  data: Upvote | Unlock | Story | number;
  property: TRANSACTION_TYPES;
  transaction?: ITransaction;
}

export enum StoryActionTypes {
  STORY_LOAD = '[Story] Load',
  STORY_LOAD_SUCCESS = '[Story] Load Success',
  STORY_LOAD_FAILURE = '[Story] Load Failure',
  STORY_COMMENT_DRAFT_LOAD = '[Story] Comment Draft Load',
  STORY_COMMENT_DRAFT_BODY_CHANGE = '[Story] Comment Draft Body Change',
  STORY_COMMENT_DRAFT_LOAD_SUCCESS = '[Story] Comment Draft Load Success',
  STORY_COMMENT_DRAFT_LOAD_FAILURE = '[Story] Comment Draft Load Failure',
  STORY_PROPERIES_LOAD_SUCCESS = '[Story] Properties Load Success',
  STORY_PROPERIES_LOAD_FAILURE = '[Story] Properties Load Failure',
  STORY_PROPERTY_LOAD = '[Story] Property Load',
  STORY_PROPERTY_UPDATE = '[Story] Property Update',
  STORY_PROPERTY_SAVE = '[Story] Property Save',
  STORY_COMMENT_CLICKED = '[Story] Comment Clicked',
}

export class StoryLoad implements Action {
  public readonly type = StoryActionTypes.STORY_LOAD;

  constructor(public payload: number) {
  }
}

export class StoryLoadSuccess implements Action {
  public readonly type = StoryActionTypes.STORY_LOAD_SUCCESS;

  constructor(public payload: Story) {
  }
}

export class StoryLoadFailure implements Action {
  public readonly type = StoryActionTypes.STORY_LOAD_FAILURE;

  constructor(public payload: FailedResponse) {
  }
}

export class StoryCommentDraftLoad implements Action {
  public readonly type = StoryActionTypes.STORY_COMMENT_DRAFT_LOAD;

  constructor(public payload: number) {
  }
}

export class StoryCommentDraftBodyChange implements Action {
  public readonly type = StoryActionTypes.STORY_COMMENT_DRAFT_BODY_CHANGE;

  constructor(public payload: string) {
  }
}

export class StoryCommentDraftLoadSuccess implements Action {
  public readonly type = StoryActionTypes.STORY_COMMENT_DRAFT_LOAD_SUCCESS;

  constructor(public payload: Story) {
  }
}

export class StoryCommentDraftLoadFailure implements Action {
  public readonly type = StoryActionTypes.STORY_COMMENT_DRAFT_LOAD_FAILURE;

  constructor(public payload: FailedResponse) {
  }
}

export class StoryPropertyLoad implements Action {
  public readonly type = StoryActionTypes.STORY_PROPERTY_LOAD;

  constructor(public payload: StoryPropertySaveContext) {
  }
}

export class StoryPropertyUpdate implements Action {
  public readonly type = StoryActionTypes.STORY_PROPERTY_UPDATE;

  constructor(public payload: {property: string, value: Story[] | Upvote[] | [Unlock[], Story]}) {
  }
}

export class StoryPropertiesLoadSuccess implements Action {
  public readonly type = StoryActionTypes.STORY_PROPERIES_LOAD_SUCCESS;

  constructor(public payload: [Story[], Upvote[], Unlock[]]) {
  }
}

export class StoryPropertiesLoadFailure implements Action {
  public readonly type = StoryActionTypes.STORY_PROPERIES_LOAD_FAILURE;

  constructor(public payload: FailedResponse) {
  }
}

export class StoryPropertySave implements Action {
  public readonly type = StoryActionTypes.STORY_PROPERTY_SAVE;

  constructor(public payload: StoryPropertySaveContext) {
  }
}

export class StoryCommentClicked implements Action {
  public readonly type = StoryActionTypes.STORY_COMMENT_CLICKED;

  constructor(public payload: Story) {
  }
}

export type All =
  | StoryLoad
  | StoryLoadSuccess
  | StoryLoadFailure
  | StoryCommentDraftBodyChange
  | StoryCommentDraftLoad
  | StoryCommentDraftLoadSuccess
  | StoryCommentDraftLoadFailure
  | StoryPropertiesLoadSuccess
  | StoryPropertiesLoadFailure
  | StoryPropertyLoad
  | StoryPropertySave
  | StoryPropertyUpdate
  | StoryCommentClicked;
