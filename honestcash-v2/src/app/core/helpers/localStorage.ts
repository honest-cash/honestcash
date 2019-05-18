export function getLocalStorage(): Storage {
  return (typeof window !== 'undefined') ? window.localStorage : null;
}

/**
 * This function exists to reset localStorage inside afterEach in tests
 */
  // @todo this needs to go away from here as the token key are not specific to this service.
export const resetLocalStorage = () => {
    localStorage.removeItem('HC_USER_TOKEN');
    localStorage.removeItem('HC_BCH_MNEMONIC');
  };
