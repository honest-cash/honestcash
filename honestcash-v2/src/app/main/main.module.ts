import {NgModule} from '@angular/core';
import {MainContainerComponent} from './main-container.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../core/shared.module';
import {MainAboutComponent} from './pages/about/about.component';
import {MainRoutingModule} from './main-routing.module';

@NgModule({
  declarations: [
    MainContainerComponent,
    MainAboutComponent,
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [MainContainerComponent]
})
export class MainModule {
}
