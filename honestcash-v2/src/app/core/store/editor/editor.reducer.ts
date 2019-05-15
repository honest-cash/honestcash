
import { EditorActionTypes, All } from './editor.actions';
import { State, initialState } from './editor.state';

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case EditorActionTypes.EDITOR_LOAD: {
      return {
        isLoaded: true,
        story: action.payload ? action.payload.story : initialState.story,
      };
    }
    case EditorActionTypes.EDITOR_UNLOAD: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
