import {NgModule} from '@angular/core';
import {StoryTitleComponent} from './components/title/story-title.component';
import {StoryBodyComponent} from './components/body/story-body.component';
import {SharedModule} from '../../core/shared.module';
import {StoryCommentButtonComponent} from './components/comment-button/comment-button.component';
import {StoryService} from './services/story.service';
import {StoryEffects} from './store/story.effects';
import {SharedComponentsModule} from '../../core/shared-components.module';

@NgModule({
  declarations: [
    StoryBodyComponent,
    StoryTitleComponent,
    StoryCommentButtonComponent,
  ],
  providers: [
    StoryService,
    StoryEffects,
  ],
  imports: [
    SharedModule,
    SharedComponentsModule,
  ],
  exports: [
    SharedModule,
    SharedComponentsModule,
    StoryBodyComponent,
    StoryTitleComponent,
    StoryCommentButtonComponent,
  ],
})
export class StorySharedModule {
}
