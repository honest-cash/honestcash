import {environmentProvider} from './environment.helper';
import {environment} from '../../environments/environment';
import {localStorageProvider} from './local-storage.helper';
import {windowProvider} from './window.helper';

describe('Helpers', () => {
  describe('environment.helper.ts', () => {
    it('environmentProvider should return environment', () => {
      const actualEnvironment = environment;
      const expectedEnvironment = environmentProvider();
      expect(actualEnvironment).toEqual(expectedEnvironment);
    });
  });

  describe('local-storage.helper.ts', () => {
    it('localStorageProvider should return localStorage', () => {
      const expectedLocalStorage = localStorageProvider();
      expect(window.localStorage).toEqual(expectedLocalStorage);
    });
  });
  describe('window.helper.ts', () => {
    it('windowProvider should return window', () => {
      const expectedWindow = windowProvider();
      expect(window).toEqual(expectedWindow);
    });
  });
});
