import {All, MainActionTypes} from './main.actions';
import {initialState, State} from './main.state';
import {Logger} from '../../../core';

const logger = new Logger();

export function reducer(state = initialState, action: All): State {
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
