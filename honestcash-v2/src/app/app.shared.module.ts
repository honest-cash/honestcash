import {NgModule} from '@angular/core';
import {localStorageProvider, LocalStorageToken} from '../core/helpers/local-storage.helper';
import {windowProvider, WindowToken} from '../core/helpers/window.helper';
import {environmentProvider, EnvironmentToken} from '../core/helpers/environment.helper';

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
