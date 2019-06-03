/**
 * This is the file where test helpers are gathered.
 */

import {environment, ENVIRONMENT_DEFAULTS} from '../../../environments/environment';

/**
 * This function exists to reset localStorage inside afterEach in tests
 */
export const resetLocalStorage = () => {
  localStorage.removeItem('HC_USER_TOKEN');
  localStorage.removeItem('HC_BCH_MNEMONIC');
};

/**
 * this exists for certain tests to reset the state
 * back to initial state of the environment
 */
export const resetEnvironment = () => {
  environment.apiUrl = ENVIRONMENT_DEFAULTS.apiUrl;
  environment.clientUrl = ENVIRONMENT_DEFAULTS.clientUrl;
  environment.production = ENVIRONMENT_DEFAULTS.production;
};
