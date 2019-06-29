import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoryRoutingModule} from './story-routing.module';
import {StoryUpvotesComponent} from './components/upvotes/story-upvotes.component';
import {StoryAuthorComponent} from './components/author/story-author.component';
import {StoryCommentEditorComponent} from './components/comment-editor/story-comment-editor.component';
import {StoryPayerBadgeComponent} from './components/payer-badge/story-payer-badge.component';
import {StoryUpvoteButtonComponent} from './components/upvote-button/story-upvote-button.component';
import {StoryTagsComponent} from './components/tags/story-tags.component';
import {StoryUnlocksComponent} from './components/unlocks/story-unlocks.component';
import {StoryDetailsComponent} from './components/details/story-details.component';
import {StoryCommentCardComponent} from './components/comment-card/story-comment-card.component';
import {StoryCommentsComponent} from './components/comments/story-comments.component';
import {SharedModule} from '../../core/shared.module';
import {StoryContainerComponent} from './story-container.component';
import {StoryActionsComponent} from './components/actions/story-actions.component';
import {StoryShareButtonsComponent} from './components/share-buttons/story-share-buttons.component';
import {StoryPaywallCallToActionComponent} from './components/paywall-call-to-action/paywall-call-to-action.component';
import {StorySharedModule} from './story-shared.module';
import {StoryLockedBodyComponent} from './components/locked-body/locked-body.component';
import {StoryComponent} from './components/story/story.component';

@NgModule({
  declarations: [
    StoryContainerComponent,
    StoryComponent,
    StoryUpvotesComponent,
    StoryUnlocksComponent,
    StoryCommentsComponent,
    StoryCommentCardComponent,
    StoryCommentEditorComponent,
    StoryDetailsComponent,
    StoryTagsComponent,
    StoryUpvoteButtonComponent,
    StoryShareButtonsComponent,
    StoryActionsComponent,
    StoryAuthorComponent,
    StoryPayerBadgeComponent,
    StoryPaywallCallToActionComponent,
    StoryLockedBodyComponent,
  ],
  imports: [
    StoryRoutingModule,
    StorySharedModule,
    CommonModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [StoryContainerComponent]
})
export class StoryModule {
}
