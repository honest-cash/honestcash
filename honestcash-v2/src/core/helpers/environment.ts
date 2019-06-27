import {InjectionToken} from '@angular/core';
import {Environment, environment} from '../../environments/environment';

export const EnvironmentToken = new InjectionToken('Environment');

export function environmentProvider(): Environment {
  return environment;
}
