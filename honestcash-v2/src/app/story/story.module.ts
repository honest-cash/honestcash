import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoryRoutingModule} from './story-routing.module';
import {SharedModule} from '../../core/shared.module';
import {StoryComponent} from './story.component';
import {StorySharedModule} from './story-shared.module';
import {LayoutModule} from '../../core/layout.module';

@NgModule({
  declarations: [
    StoryComponent,
  ],
  imports: [
    StoryRoutingModule,
    StorySharedModule,
    CommonModule,
    LayoutModule,
    CommonModule,
    SharedModule,
  ],
  bootstrap: [StoryComponent]
})
export class StoryModule {
}
