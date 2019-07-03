import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from './shared/modules/font-awesome.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {QRCodeModule} from 'angularx-qrcode';
import {ToastrModule} from 'ngx-toastr';
import {RouterModule} from '@angular/router';

@NgModule({
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
    QRCodeModule,
    ToastrModule,
    NgbModule,
    RouterModule,
  ]
})
export class SharedModule {
}
