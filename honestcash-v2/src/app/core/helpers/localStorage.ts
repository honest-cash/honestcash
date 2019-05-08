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
  localStorage.removeItem('HC_USER_TOKEN');
  localStorage.removeItem('HC_BCH_MNEMONIC');
};
