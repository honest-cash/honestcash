import {AppStates} from '../../app.states';
import {initialState as initialAppState} from '../../app/store/app/app.state';
import {initialState as initialWalletState} from '../../wallet/store/wallet/wallet.state';
import {initialState as initialUserState} from '../../user/store/user/user.state';
import {initialState as initialAuthState} from '../../auth/store/auth/auth.state';
import {initialState as initialEditorState} from '../../editor/store/editor/editor.state';

export const initialAppStates: AppStates = {
  app: initialAppState,
  wallet: initialWalletState,
  user: initialUserState,
  auth: initialAuthState,
  editor: initialEditorState,
};
