import { Action } from '@ngrx/store';

export enum EditorActionTypes {
  EDITOR_LOAD = '[Editor] Editor load',
}

export class EditorLoad implements Action {
  readonly type = EditorActionTypes.EDITOR_LOAD;
  constructor() {}
}

export type All =
   | EditorLoad;
