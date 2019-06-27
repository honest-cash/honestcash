import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WalletComponent } from './wallet.component';

@NgModule({
  declarations: [
    WalletComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  providers: [
  ],
  bootstrap: [WalletComponent]
})
export class WalletModule { }
