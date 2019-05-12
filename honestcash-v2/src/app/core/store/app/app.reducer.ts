
import { AppActionTypes, All } from './app.actions';
import { State, initialState } from './app.state';

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AppActionTypes.APP_LOAD: {
      return {
        isLoaded: true,
      };
    }
    default: {
      return state;
    }
  }
}
