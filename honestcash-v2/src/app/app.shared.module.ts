import {NgModule} from '@angular/core';
import {localStorageProvider, LocalStorageToken} from './core/helpers/localStorage';
import {windowProvider, WindowToken} from './core/helpers/window';
import {environmentProvider, EnvironmentToken} from './core/helpers/environment';

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
