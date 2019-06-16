import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {AuthEffects} from './store/auth/auth.effects';
import {WalletEffects} from './store/wallet/wallet.effects';
import {UserEffects} from './store/user/user.effects';

import {metaReducers, reducers} from './app.states';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {HeaderInterceptor} from './core/http/header.interceptor';
import {AppEffects} from './store/app/app.effects';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EditorEffects} from './store/editor/editor.effects';
import {AppSharedModule} from './app.shared.module';
import {ToastrModule} from 'ngx-toastr';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'honestcash-v2'
    }),
    BrowserAnimationsModule,
    AppRoutingModule,
    AppSharedModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([AppEffects, AuthEffects, UserEffects, EditorEffects, WalletEffects,]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !environment.production}),
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
