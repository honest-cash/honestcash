import {All, MainActionTypes} from './main.actions';
import {initialMainState, MainState} from './main.state';
import {Logger} from '../../../core';

const logger = new Logger();

export function reducer(state = initialMainState, action: All): MainState {
  switch (action.type) {
    case MainActionTypes.MAIN_LOAD: {
      logger.info('Main Loaded');
      return {
        isLoaded: true,
      };
    }
    default: {
      return state;
    }
  }
}
