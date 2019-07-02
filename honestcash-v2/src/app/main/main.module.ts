import {NgModule} from '@angular/core';
import {MainContainerComponent} from './main-container.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../core/shared.module';
import {MainAboutComponent} from './pages/about/about.component';
import {MainRoutingModule} from './main-routing.module';
import {MainTermsOfServiceComponent} from './pages/terms-of-service/terms-of-service.component';
import {StorySharedModule} from '../story/story-shared.module';
import {LayoutModule} from '../../core/layout.module';

@NgModule({
  declarations: [
    MainContainerComponent,
    MainAboutComponent,
    MainTermsOfServiceComponent,
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    SharedModule,
    LayoutModule,
    StorySharedModule,
  ],
  providers: [],
  bootstrap: [MainContainerComponent]
})
export class MainModule {
}
