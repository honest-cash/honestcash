import {AppStates} from '../../../app/app.states';
import {initialState as initialAppState} from '../../../app/main/store/main.state';
import {initialState as initialWalletState} from '../../../app/wallet/store/wallet.state';
import {initialState as initialUserState} from '../../../app/user/store/user.state';
import {initialState as initialAuthState} from '../../../app/auth/store/auth.state';
import {initialState as initialEditorState} from '../../../app/editor/store/editor.state';

export const initialAppStates: AppStates = {
  app: initialAppState,
  wallet: initialWalletState,
  user: initialUserState,
  auth: initialAuthState,
  editor: initialEditorState,
};
