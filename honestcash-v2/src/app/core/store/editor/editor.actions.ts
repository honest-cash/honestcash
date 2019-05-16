import { Action } from '@ngrx/store';
import Post, {PostSaveSuccessResponse} from '../../models/post';
import {FailedResponse} from '../../models/authentication';
import Hashtag from '../../models/hashtag';
import {INgxChipsTag} from '../../../modules/editor/components/publish-modal/publish-modal.component';

export enum EditorActionTypes {
  EDITOR_LOAD = '[Editor] Editor Load',
  EDITOR_UNLOAD = '[Editor] Editor Unload',
  EDITOR_CHANGE = '[Editor] Editor Change',
  EDITOR_STORY_PROPERTY_CHANGE = '[Editor] Story Property Change',
  EDITOR_STORY_SAVE = '[Editor] Story Save',
  EDITOR_STORY_SAVE_SUCCESS = '[Editor] Story Save Success',
  EDITOR_STORY_SAVE_FAILURE = '[Editor] Story Save Failure',
  EDITOR_STORY_SAVE_AND_PUBLISH = '[Editor] Story Save and Publish',
  EDITOR_STORY_PUBLISH = '[Editor] Story Publish',
  EDITOR_STORY_PUBLISH_SUCCESS = '[Editor] Story Publish Success',
  EDITOR_STORY_PUBLISH_FAILURE = '[Editor] Story Publish Failure',
}

export class EditorLoad implements Action {
  readonly type = EditorActionTypes.EDITOR_LOAD;
  constructor(public payload?: { story: Post }) {}
}

export class EditorUnload implements Action {
  readonly type = EditorActionTypes.EDITOR_UNLOAD;
  constructor() {}
}

export class EditorChange implements Action {
  readonly type = EditorActionTypes.EDITOR_CHANGE;
  constructor(public payload: Post) {}
}

export class EditorPropertyChange implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_PROPERTY_CHANGE;
  constructor(public payload: { property: string; value: string | Hashtag[] | INgxChipsTag[]; }) {}
}

export class EditorStorySave implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_SAVE;
  constructor(public payload: Post) {}
}

export class EditorStorySaveSuccess implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_SAVE_SUCCESS;
  constructor(public payload: Post) {}
}

export class EditorStorySaveAndPublish implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_SAVE_AND_PUBLISH;
  constructor(public payload: Post) {}
}

export class EditorStorySaveFailure implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_SAVE_FAILURE;
  constructor(public payload: FailedResponse) {}
}

export class EditorStoryPublish implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_PUBLISH;
  constructor(public payload: Post) {}
}

export class EditorStoryPublishSuccess implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_PUBLISH_SUCCESS;
  constructor(public payload: Post) {}
}

export class EditorStoryPublishFailure implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_PUBLISH_FAILURE;
  constructor(public payload: FailedResponse) {}
}

export type All =
   | EditorLoad
   | EditorUnload
   | EditorChange
   | EditorPropertyChange
   | EditorStorySave
   | EditorStorySaveSuccess
   | EditorStorySaveFailure
   | EditorStorySaveAndPublish
   | EditorStoryPublish
   | EditorStoryPublishSuccess
   | EditorStoryPublishFailure;
