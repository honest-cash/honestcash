import {NgModule} from '@angular/core';
import {UserContainerComponent} from './user-container.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UserRoutingModule} from './user-routing.module';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './store/user.effects';
import {UserSharedModule} from './user-shared.module';
import {LayoutModule} from '../../core/layout.module';


@NgModule({
  declarations: [
    UserContainerComponent,
  ],
  imports: [
    EffectsModule.forRoot([UserEffects]),
    FormsModule,
    UserRoutingModule,
    UserSharedModule,
    CommonModule,
    LayoutModule,
  ],
  bootstrap: [UserContainerComponent]
})
export class UserModule {
}
