import {All, WalletActionTypes} from './wallet.actions';
import {initialWalletState, WalletState} from './wallet.state';
import {WALLET_STATUS} from '../models/status';

export function reducer(state = initialWalletState, action: All): WalletState {
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
        status: WALLET_STATUS.Generated
      };
    }
    case WalletActionTypes.WALLET_BALANCE_UPDATED: {
      return {
        ...state,
        balance: action.payload,
      };
    }
    case WalletActionTypes.WALLET_STATUS_UPDATED: {
      return {
        ...state,
        status: action.payload,
      };
    }
    case WalletActionTypes.WALLET_CLEANUP: {
      return initialWalletState;
    }
    default: {
      return state;
    }
  }
}
