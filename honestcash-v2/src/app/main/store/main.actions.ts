import {Action} from '@ngrx/store';

export enum MainActionTypes {
  MAIN_LOAD = '[Main] Main load',
}

export class MainLoad implements Action {
  public readonly type = MainActionTypes.MAIN_LOAD;
}

export type All =
  | MainLoad;
