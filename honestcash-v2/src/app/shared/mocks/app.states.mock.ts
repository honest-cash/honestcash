import {AppStates} from '../../app.states';
import {initialState as initialAppState} from '../../store/app/app.state';
import {initialState as initialWalletState} from '../../store/wallet/wallet.state';
import {initialState as initialUserState} from '../../store/user/user.state';
import {initialState as initialAuthState} from '../../store/auth/auth.state';
import {initialState as initialEditorState} from '../../store/editor/editor.state';

export const initialAppStates: AppStates = {
  app: initialAppState,
  wallet: initialWalletState,
  user: initialUserState,
  auth: initialAuthState,
  editor: initialEditorState,
};
