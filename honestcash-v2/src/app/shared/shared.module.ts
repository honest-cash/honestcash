import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from './modules/font-awesome.module';
import {AvatarComponent} from './components/avatar/avatar.component';
import {HeaderProfileMenuComponent} from './components/header-profile-menu/header-profile-menu.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderComponent} from './components/header/header.component';
import {HonestLogoComponent} from './components/honest-logo/honest-logo.component';

@NgModule({
  declarations: [
    AvatarComponent,
    HeaderComponent,
    HeaderProfileMenuComponent,
    HonestLogoComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
  ],
  exports: [
    AvatarComponent,
    HeaderComponent,
    HeaderProfileMenuComponent,
    CommonModule,
    FontAwesomeModule,
    HonestLogoComponent,
  ]
})
export class SharedModule {
}
