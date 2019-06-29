import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from './shared/modules/font-awesome.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedHonestLogoComponent} from './shared/components/honest-logo/honest-logo.component';
import {SharedAvatarComponent} from './shared/components/avatar/avatar.component';
import {SharedHeaderComponent} from './shared/components/header/header.component';
import {ShardHeaderProfileMenuComponent} from './shared/components/header-profile-menu/header-profile-menu.component';
import {SharedNotFoundComponent} from './shared/pages/not-found/not-found.component';
import {SharedLoadingIndicatorComponent} from './shared/components/loading-indicator/loading-indicator.component';

@NgModule({
  declarations: [
    SharedAvatarComponent,
    SharedHeaderComponent,
    ShardHeaderProfileMenuComponent,
    SharedHonestLogoComponent,
    SharedLoadingIndicatorComponent,
    SharedNotFoundComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
  ],
  exports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    SharedAvatarComponent,
    SharedHeaderComponent,
    ShardHeaderProfileMenuComponent,
    SharedHonestLogoComponent,
    SharedLoadingIndicatorComponent,
  ]
})
export class SharedModule {
}
