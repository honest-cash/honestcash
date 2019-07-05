import {NgModule} from '@angular/core';
import {StoryTitleComponent} from './components/title/story-title.component';
import {StoryBodyComponent} from './components/body/story-body.component';
import {SharedModule} from '../../core/shared.module';
import {StoryCommentButtonComponent} from './components/comment-button/comment-button.component';
import {StoryService} from './services/story.service';
import {StoryEffects} from './store/story.effects';
import {SharedComponentsModule} from '../../core/shared-components.module';
import {StoryUpvotesComponent} from './components/upvotes/story-upvotes.component';
import {StoryUnlocksComponent} from './components/unlocks/story-unlocks.component';
import {StoryCommentsComponent} from './components/comments/story-comments.component';
import {StoryCommentCardComponent} from './components/comment-card/story-comment-card.component';
import {StoryCommentEditorComponent} from './components/comment-editor/story-comment-editor.component';
import {StoryDetailsComponent} from './components/details/story-details.component';
import {StoryTagsComponent} from './components/tags/story-tags.component';
import {StoryUpvoteButtonComponent} from './components/upvote-button/story-upvote-button.component';
import {StoryShareButtonsComponent} from './components/share-buttons/story-share-buttons.component';
import {StoryActionsComponent} from './components/actions/story-actions.component';
import {StoryAuthorComponent} from './components/author/story-author.component';
import {StoryPayerBadgeComponent} from './components/payer-badge/story-payer-badge.component';
import {StoryPaywallCallToActionComponent} from './components/paywall-call-to-action/paywall-call-to-action.component';
import {StoryLockedBodyComponent} from './components/locked-body/locked-body.component';
import {StoryUnlockButtonComponent} from './components/unlock-button/unlock-button.component';
import {StoryCommentCardActionsComponent} from './components/comment-card-actions/comment-card-actions.component';
import {StoryCommentCardBodyComponent} from './components/comment-card-body/story-comment-card-body.component';
import {StoryCommentCardHeaderComponent} from './components/comment-card-header/story-comment-card-header.component';
import {StoryResponseDetailsComponent} from './components/response-details/response-details.component';
import {OrderModule} from 'ngx-order-pipe';
import {WalletSharedModule} from '../wallet/wallet-shared.module';
import {UserSharedModule} from '../user/user-shared.module';

@NgModule({
  declarations: [
    StoryBodyComponent,
    StoryTitleComponent,
    StoryCommentButtonComponent,
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
  providers: [
    StoryService,
    StoryEffects,
  ],
  imports: [
    SharedModule,
    SharedComponentsModule,
    OrderModule,
    WalletSharedModule,
    UserSharedModule,
  ],
  exports: [
    SharedModule,
    SharedComponentsModule,
    StoryBodyComponent,
    StoryTitleComponent,
    StoryCommentButtonComponent,
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
})
export class StorySharedModule {
}
