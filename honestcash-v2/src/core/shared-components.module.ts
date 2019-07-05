import {NgModule} from '@angular/core';
import {SharedHonestLogoComponent} from './shared/components/honest-logo/honest-logo.component';
import {SharedAvatarComponent} from './shared/components/avatar/avatar.component';
import {SharedLoadingIndicatorComponent} from './shared/components/loading-indicator/loading-indicator.component';
import {SharedModule} from './shared.module';
import {SharedWriteButtonComponent} from './shared/components/write-button/write-button.component';

@NgModule({
  declarations: [
    SharedAvatarComponent,
    SharedHonestLogoComponent,
    SharedLoadingIndicatorComponent,
    SharedWriteButtonComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    SharedAvatarComponent,
    SharedHonestLogoComponent,
    SharedLoadingIndicatorComponent,
    SharedWriteButtonComponent,
  ]
})
export class SharedComponentsModule {
}
