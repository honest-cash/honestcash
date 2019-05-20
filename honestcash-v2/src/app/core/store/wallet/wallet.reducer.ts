import {All, WalletActionTypes} from './wallet.actions';
import {initialState, State} from './wallet.state';

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case WalletActionTypes.WALLET_SETUP: {
      return {
        ...state,
      };
    }
    case WalletActionTypes.WALLET_GENERATED: {
      return {
        ...state,
        wallet: action.payload.wallet,
      };
    }
    case WalletActionTypes.WALLET_CLEANUP: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
