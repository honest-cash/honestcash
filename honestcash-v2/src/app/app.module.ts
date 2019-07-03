import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './app.states';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {HeaderInterceptor} from '../core/http/header.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppSharedModule} from './app.shared.module';
import {CoreEffects} from '../core/store/core.effects';
import {AppNotFoundComponent} from './shared/pages/not-found/not-found.component';
import {CoreModule} from '../core/core.module';
import {LayoutModule} from '../core/layout.module';
import {AuthEffects} from './auth/store/auth.effects';
import {UserEffects} from './user/store/user.effects';
import {WalletEffects} from './wallet/store/wallet.effects';
import {StoryEffects} from './story/store/story.effects';
import {UserSharedModule} from './user/user-shared.module';
import {WalletSharedModule} from './wallet/wallet-shared.module';
import {StorySharedModule} from './story/story-shared.module';
import {EditorEffects} from './editor/store/editor.effects';
import {EditorSharedModule} from './editor/editor-shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AppNotFoundComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'honestcash-v2'
    }),
    BrowserAnimationsModule,
    AppRoutingModule,
    AppSharedModule,
    CoreModule,
    LayoutModule,
    UserSharedModule,
    WalletSharedModule,
    StorySharedModule,
    EditorSharedModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([CoreEffects, AuthEffects, UserEffects, WalletEffects, EditorEffects, StoryEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !environment.production}),
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
export class AppModule {}
