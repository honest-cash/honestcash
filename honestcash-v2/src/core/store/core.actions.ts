import {Action} from '@ngrx/store';

export enum CoreActionTypes {
  CORE_LOAD = '[Core] Core Load',
}

export class CoreLoad implements Action {
  public readonly type = CoreActionTypes.CORE_LOAD;
}

export type All =
  | CoreLoad;
