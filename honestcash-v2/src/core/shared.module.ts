import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from './shared/modules/font-awesome.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedHonestLogoComponent} from './shared/components/honest-logo/honest-logo.component';
import {SharedAvatarComponent} from './shared/components/avatar/avatar.component';
import {AppNotFoundComponent} from '../app/shared/pages/not-found/not-found.component';
import {SharedLoadingIndicatorComponent} from './shared/components/loading-indicator/loading-indicator.component';
import {QRCodeModule} from 'angularx-qrcode';
import {ToastrModule} from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import {LayoutModule} from './layout.module';

@NgModule({
  declarations: [
    SharedAvatarComponent,
    SharedHonestLogoComponent,
    SharedLoadingIndicatorComponent,
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
    RouterModule,
    SharedAvatarComponent,
    SharedHonestLogoComponent,
    SharedLoadingIndicatorComponent,
  ]
})
export class SharedModule {
}
