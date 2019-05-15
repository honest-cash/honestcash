import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '../core/modules/font-awesome.module';
import {AvatarComponent} from './components/avatar/avatar.component';
import {HeaderProfileMenuComponent} from './components/header-profile-menu/header-profile-menu.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AvatarComponent,
    HeaderProfileMenuComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
  ],
  exports: [
    AvatarComponent,
    HeaderProfileMenuComponent,
    CommonModule,
    FontAwesomeModule,
  ]
})
export class SharedModule { }
