import {NgModule} from '@angular/core';
import {SharedHonestLogoComponent} from './shared/components/honest-logo/honest-logo.component';
import {SharedAvatarComponent} from './shared/components/avatar/avatar.component';
import {SharedLoadingIndicatorComponent} from './shared/components/loading-indicator/loading-indicator.component';
import {SharedModule} from './shared.module';

@NgModule({
  declarations: [
    SharedAvatarComponent,
    SharedHonestLogoComponent,
    SharedLoadingIndicatorComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    SharedAvatarComponent,
    SharedHonestLogoComponent,
    SharedLoadingIndicatorComponent,
  ]
})
export class SharedComponentsModule {
}
