import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {AuthEffects} from './core/store/auth/auth.effects';
import {WalletEffects} from './core/store/wallet/wallet.effects';
import {UserEffects} from './core/store/user/user.effects';

import {metaReducers, reducers} from './app.states';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {TokenInterceptor} from './core/http/token.interceptor';
import {AppEffects} from './core/store/app/app.effects';
import {FontAwesomeModule} from './core/modules/font-awesome.module';
import {AppSharedModule} from './app.shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'honestcash-v2'
    }),
    AppRoutingModule,
    AppSharedModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([AppEffects, AuthEffects, UserEffects, WalletEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    FontAwesomeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
