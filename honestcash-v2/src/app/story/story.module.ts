import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoryRoutingModule} from './story-routing.module';
import {MainStoryUpvotesComponent} from './components/story-upvotes/story-upvotes.component';
import {MainStoryTitleComponent} from './components/story-title/story-title.component';
import {MainStoryAuthorComponent} from './components/story-author/story-author.component';
import {MainStoryCommentEditorComponent} from './components/story-comment-editor/story-comment-editor.component';
import {MainStoryPayerBadgeComponent} from './components/story-payer-badge/story-payer-badge.component';
import {MainStoryUpvoteButtonComponent} from './components/story-upvote-button/story-upvote-button.component';
import {MainStoryTagsComponent} from './components/story-tags/story-tags.component';
import {MainStoryUnlocksComponent} from './components/story-unlocks/story-unlocks.component';
import {MainStoryDetailsComponent} from './components/story-details/story-details.component';
import {MainStoryBodyComponent} from './components/story-body/story-body.component';
import {MainStoryCommentCardComponent} from './components/story-comment-card/story-comment-card.component';
import {MainStoryCommentsComponent} from './components/story-comments/story-comments.component';
import {SharedModule} from '../../core/shared.module';
import {MainStoryComponent} from './story.component';
import {MainStoryActionsComponent} from './components/story-actions/story-actions.component';
import {MainStoryShareButtonsComponent} from './components/story-share-buttons/story-share-buttons.component';

@NgModule({
  declarations: [
    MainStoryComponent,
    MainStoryUpvotesComponent,
    MainStoryUnlocksComponent,
    MainStoryCommentsComponent,
    MainStoryCommentCardComponent,
    MainStoryCommentEditorComponent,
    MainStoryDetailsComponent,
    MainStoryBodyComponent,
    MainStoryTitleComponent,
    MainStoryTagsComponent,
    MainStoryUpvoteButtonComponent,
    MainStoryShareButtonsComponent,
    MainStoryActionsComponent,
    MainStoryAuthorComponent,
    MainStoryPayerBadgeComponent,
  ],
  imports: [
    StoryRoutingModule,
    CommonModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [MainStoryComponent]
})
export class StoryModule {
}
