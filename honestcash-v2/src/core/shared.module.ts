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
import {WalletSharedModule} from '../app/wallet/wallet-shared.module';
import {SharedReceiptComponent} from './shared/components/receipt/receipt.component';
import {QRCodeModule} from 'angularx-qrcode';
import {SharedTransactionButtonComponent} from './shared/components/transaction-button/transaction-button.component';
import {TransactionService} from './shared/services/transaction.service';
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
    SharedReceiptComponent,
    SharedTransactionButtonComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    WalletSharedModule,
    QRCodeModule,
    ToastrModule.forRoot(),
    RouterModule,
  ],
  providers: [
    TransactionService,
    WalletService,
    StoryService,
  ],
  entryComponents: [
    SharedReceiptComponent,
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
    SharedReceiptComponent,
    SharedTransactionButtonComponent,
  ]
})
export class SharedModule {
}
