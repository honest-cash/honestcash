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
import {StoryActionsComponent} from './components/actions/story-actions.component';
import {StoryShareButtonsComponent} from './components/share-buttons/story-share-buttons.component';
import {StoryPaywallCallToActionComponent} from './components/paywall-call-to-action/paywall-call-to-action.component';
import {StorySharedModule} from './story-shared.module';
import {StoryLockedBodyComponent} from './components/locked-body/locked-body.component';
import {StoryComponent} from './story.component';
import {StoryUnlockButtonComponent} from './components/unlock-button/unlock-button.component';
import {StoryCommentCardActionsComponent} from './components/comment-card-actions/comment-card-actions.component';
import {StoryCommentCardBodyComponent} from './components/comment-card-body/story-comment-card-body.component';
import {StoryCommentCardHeaderComponent} from './components/comment-card-header/story-comment-card-header.component';
import {WalletSharedModule} from '../wallet/wallet-shared.module';
import {LayoutModule} from '../../core/layout.module';
import {StoryResponseDetailsComponent} from './components/response-details/response-details.component';
import {OrderModule} from 'ngx-order-pipe';

@NgModule({
  declarations: [
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
    StoryUnlockButtonComponent,
    StoryCommentCardActionsComponent,
    StoryCommentCardBodyComponent,
    StoryCommentCardHeaderComponent,
    StoryResponseDetailsComponent,
  ],
  imports: [
    StoryRoutingModule,
    StorySharedModule,
    WalletSharedModule,
    LayoutModule,
    CommonModule,
    SharedModule,
    OrderModule,
  ],
  providers: [],
  bootstrap: [StoryComponent]
})
export class StoryModule {
}
