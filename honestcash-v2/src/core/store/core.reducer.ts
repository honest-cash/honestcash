import {CoreState, initialCoreState} from './core.state';
import {All, CoreActionTypes} from './core.actions';
import {Logger} from '..';


const logger = new Logger();

export function reducer(state = initialCoreState, action: All): CoreState {
  switch (action.type) {
    case CoreActionTypes.CORE_LOAD: {
      logger.info('Core Loaded');
      return {
        isLoaded: true,
      };
    }
    default: {
      return state;
    }
  }
}
