import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserFollowButtonComponent} from './components/follow-button/follow-button.component';
import {SharedModule} from '../../core/shared.module';
import {UserService} from './services/user.service';

@NgModule({
  declarations: [
    UserFollowButtonComponent,
  ],
  imports: [
    SharedModule,
  ],
  providers: [
    UserService,
  ],
  exports: [
    UserFollowButtonComponent,
  ],
})
export class UserSharedModule {
}
