import {NgModule} from '@angular/core';
import {getLocalStorage} from './core/helpers/localStorage';

@NgModule({
  declarations: [],
  providers: [
    {
      provide: 'LOCALSTORAGE', useFactory: getLocalStorage
    }
  ],
})
export class AppSharedModule {
  constructor() {
  }
}
