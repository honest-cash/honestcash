import {InjectionToken} from '@angular/core';

export const LocalStorageToken = new InjectionToken('LocalStorage');

export function localStorageProvider(): Storage {
  return (typeof window !== 'undefined') ? window.localStorage : null;
}
