/**
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AboutModule } from './about/about.module';
import { LoginModule } from './login/login.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env/environment';
*/

import { EditorRoutingModule } from './editor-routing.module';
import { NgModule } from '@angular/core';
import { EditorWrapperComponent } from './editor-wrapper.component';
import { EditorCoreComponent } from './editor-core/editor-core.component';
import { PostService } from '@app/services/post.service';
import { EditorService } from './editor-core/editor.service';
import { UserService } from '@app/services/user.service';

@NgModule({
  imports: [
    // @todo service worker to enable shell header
    // ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    /**
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AboutModule,
    LoginModule,
    */
    EditorRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  declarations: [EditorWrapperComponent, EditorCoreComponent],
  providers: [UserService, PostService, EditorService],
  bootstrap: [EditorWrapperComponent]
})
export class EditorModule {}
