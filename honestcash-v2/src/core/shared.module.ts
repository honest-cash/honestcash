import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from './shared/modules/font-awesome.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CoreHonestLogoComponent} from './shared/components/honest-logo/honest-logo.component';
import {CoreAvatarComponent} from './shared/components/avatar/avatar.component';
import {CoreHeaderComponent} from './shared/components/header/header.component';
import {CoreHeaderProfileMenuComponent} from './shared/components/header-profile-menu/header-profile-menu.component';

@NgModule({
  declarations: [
    CoreAvatarComponent,
    CoreHeaderComponent,
    CoreHeaderProfileMenuComponent,
    CoreHonestLogoComponent
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
    CoreAvatarComponent,
    CoreHeaderComponent,
    CoreHeaderProfileMenuComponent,
    CoreHonestLogoComponent,
  ]
})
export class SharedModule {
}
