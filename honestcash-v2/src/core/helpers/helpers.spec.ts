import {environmentProvider} from './environment';
import {environment} from '../../environments/environment';
import {localStorageProvider} from './localStorage';
import {windowProvider} from './window';

describe('Helpers', () => {
  describe('environment', () => {
    it('environmentProvider should return environment', () => {
      const actualEnvironment = environment;
      const expectedEnvironment = environmentProvider();
      expect(actualEnvironment).toEqual(expectedEnvironment);
    });
  });

  describe('localStorage', () => {
    it('localStorageProvider should return localStorage', () => {
      const expectedLocalStorage = localStorageProvider();
      expect(window.localStorage).toEqual(expectedLocalStorage);
    });
  });
  describe('window', () => {
    it('windowProvider should return window', () => {
      const expectedWindow = windowProvider();
      expect(window).toEqual(expectedWindow);
    });
  });
});
