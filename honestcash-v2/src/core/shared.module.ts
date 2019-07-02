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
import {QRCodeModule} from 'angularx-qrcode';
import {WalletService} from '../app/wallet/services/wallet.service';
import {StoryService} from '../app/story/services/story.service';
import {ToastrModule} from 'ngx-toastr';
import {RouterModule} from '@angular/router';

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
    QRCodeModule,
    ToastrModule.forRoot(),
    RouterModule,
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
