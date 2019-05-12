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
// @todo this needs to go away from here as the token key are not specific to this service.
export const resetLocalStorage = () => {
  localStorage.removeItem('HC_USER_TOKEN');
  localStorage.removeItem('HC_BCH_MNEMONIC');
};
