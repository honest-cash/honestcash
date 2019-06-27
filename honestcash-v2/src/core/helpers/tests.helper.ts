/**
 * This is the file where test helpers are gathered.
 */

/**
 * This function exists to reset localStorage inside afterEach in tests
 */
export const resetLocalStorage = () => {
  localStorage.removeItem('HC_USER_TOKEN');
  localStorage.removeItem('HC_BCH_MNEMONIC');
};
