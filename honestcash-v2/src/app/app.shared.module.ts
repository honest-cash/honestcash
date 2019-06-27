import {NgModule} from '@angular/core';
import {localStorageProvider, LocalStorageToken} from '../core/shared/helpers/local-storage.helper';
import {windowProvider, WindowToken} from '../core/shared/helpers/window.helper';
import {environmentProvider, EnvironmentToken} from '../core/shared/helpers/environment.helper';

@NgModule({
  declarations: [],
  providers: [
    {provide: LocalStorageToken, useFactory: localStorageProvider},
    {provide: WindowToken, useFactory: windowProvider},
    {provide: EnvironmentToken, useFactory: environmentProvider}
  ],
})
export class AppSharedModule {
  constructor() {
  }
}
