import {CoreState, initialCoreState} from './core.state';
import {All, CoreActionTypes} from './core.actions';

export function reducer(state = initialCoreState, action: All): CoreState {
  switch (action.type) {
    case CoreActionTypes.CORE_LOAD: {
      return {
        isLoaded: true,
      };
    }
    default: {
      return state;
    }
  }
}
