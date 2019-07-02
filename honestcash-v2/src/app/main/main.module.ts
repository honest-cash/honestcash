import {NgModule} from '@angular/core';
import {MainContainerComponent} from './main-container.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../core/shared.module';
import {MainAboutComponent} from './pages/about/about.component';
import {MainRoutingModule} from './main-routing.module';
import {MainTermsOfServiceComponent} from './pages/terms-of-service/terms-of-service.component';
import {StorySharedModule} from '../story/story-shared.module';
import {MainPrivacyPolicyComponent} from './pages/privacy-policy/privacy-policy.component';

@NgModule({
  declarations: [
    MainContainerComponent,
    MainAboutComponent,
    MainTermsOfServiceComponent,
    MainPrivacyPolicyComponent,
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    SharedModule,
    StorySharedModule,
  ],
  providers: [],
  bootstrap: [MainContainerComponent]
})
export class MainModule {
}
