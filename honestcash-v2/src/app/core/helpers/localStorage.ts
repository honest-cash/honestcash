/**
 * This function exists only for SSR because the SSR server does not support localStorage.
 */
import {LOCAL_TOKEN_KEY} from '../services/authentication.service';
import {WALLET_LOCALSTORAGE_KEYS} from '../services/wallet.service';

export const getLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage;
  }

  return {
    setItem: (_key: string, _value: string) => void 0,
    getItem: (_key: string) => void 0,
    removeItem: (_key: string) => void 0
  };
};

/**
 * This function exists to reset localStorage inside afterEach in tests
 */
export const resetLocalStorage = () => {
  localStorage.removeItem(LOCAL_TOKEN_KEY);
  localStorage.removeItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC);
};
