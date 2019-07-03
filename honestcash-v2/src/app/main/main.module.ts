import {NgModule} from '@angular/core';
import {MainContainerComponent} from './main-container.component';
import {SharedModule} from '../../core/shared.module';
import {MainAboutComponent} from './pages/about/about.component';
import {MainRoutingModule} from './main-routing.module';
import {MainTermsOfServiceComponent} from './pages/terms-of-service/terms-of-service.component';
import {StorySharedModule} from '../story/story-shared.module';
import {MainPrivacyPolicyComponent} from './pages/privacy-policy/privacy-policy.component';
import {MainFaqComponent} from './pages/faq/faq.component';
import {LayoutModule} from '../../core/layout.module';

@NgModule({
  declarations: [
    MainContainerComponent,
    MainAboutComponent,
    MainTermsOfServiceComponent,
    MainPrivacyPolicyComponent,
    MainFaqComponent,
  ],
  imports: [
    MainRoutingModule,
    SharedModule,
    StorySharedModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [MainContainerComponent]
})
export class MainModule {
}
