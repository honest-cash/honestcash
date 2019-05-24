import {All, AppActionTypes} from './app.actions';
import {initialState, State} from './app.state';
import {Logger} from '../..';

const logger = new Logger();

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AppActionTypes.APP_LOAD: {
      logger.info('App Loaded');
      return {
        isLoaded: true,
      };
    }
    default: {
      return state;
    }
  }
}
