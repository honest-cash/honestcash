import {NgModule} from '@angular/core';
import {StoryTitleComponent} from './components/title/story-title.component';
import {StoryBodyComponent} from './components/body/story-body.component';
import {StoryService} from './services/story.service';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../core/shared.module';
import {StoryCommentButtonComponent} from './components/comment-button/comment-button.component';

@NgModule({
  declarations: [
    StoryBodyComponent,
    StoryTitleComponent,
    StoryCommentButtonComponent,
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
    StoryCommentButtonComponent,
  ],
})
export class StorySharedModule {
}
