import {NgModule} from '@angular/core';
import {StoryTitleComponent} from './components/title/story-title.component';
import {StoryBodyComponent} from './components/body/story-body.component';
import {StoryService} from './services/story.service';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../core/shared.module';

@NgModule({
  declarations: [
    StoryBodyComponent,
    StoryTitleComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [
    StoryService,
  ],
  exports: [
    StoryBodyComponent,
    StoryTitleComponent,
  ],
})
export class StorySharedModule {
}
