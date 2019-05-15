
import { EditorActionTypes, All } from './editor.actions';
import { State, initialState } from './editor.state';
import blankBody from './editor.story.body.initial-value';

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case EditorActionTypes.EDITOR_LOAD: {
      const story = action.payload ? action.payload.story : initialState.story;
      if (!action.payload) {
        // set a body to the draft
        // to guide the user through the editor features
        story.body = blankBody;

      }
      return {
        isLoaded: true,
        story,
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
