// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export interface Environment {
  apiUrl: string;
  clientUrl: string;
  production: boolean;
}

export const ENVIRONMENT_DEFAULTS: Environment = {
  apiUrl: 'https://beta.honest.cash/api',
  clientUrl: 'https://beta.honest.cash/',
  production: false
};

export const environment: Environment = {
  // this format is explicitly written like this
  // the environment is injected into services
  // however during tests, you sometimes need to test based on environment
  // this ensures that environment is dynamic and can be changed
  // so that both production true and false values can be tested inside spec
  apiUrl: ENVIRONMENT_DEFAULTS.apiUrl,
  clientUrl: ENVIRONMENT_DEFAULTS.clientUrl,
  production: ENVIRONMENT_DEFAULTS.production,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
