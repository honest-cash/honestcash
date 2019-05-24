import {InjectionToken} from '@angular/core';
import {environment} from '../../../environments/environment';

export const EnvironmentToken = new InjectionToken('Environment');

export function environmentProvider() {
  return environment;
}
