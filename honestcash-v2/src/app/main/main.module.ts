import {NgModule} from '@angular/core';
import {MainContainerComponent} from './main-container.component';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../core/shared.module';
import {MainStoryComponent} from './pages/story/story.component';
import {MainAboutComponent} from './pages/about/about.component';
import { MainStoryUpvotesComponent } from './components/story-upvotes/story-upvotes.component';
import {MainStoryUnlocksComponent} from './components/story-unlocks/story-unlocks.component';
import {MainStoryCommentsComponent} from './components/story-comments/story-comments.component';
import {MainStoryCommentCardComponent} from './components/story-comment-card/story-comment-card.component';
import {MainStoryCommentEditorComponent} from './components/story-comment-editor/story-comment-editor.component';
import {MainStoryDetailsComponent} from './components/story-details/story-details.component';
import {MainStoryBodyComponent} from './components/story-body/story-body.component';
import {MainStoryTitleComponent} from './components/story-title/story-title.component';
import {MainStoryTagsComponent} from './components/story-tags/story-tags.component';
import {MainStoryUpvoteButtonComponent} from './components/story-upvote-button/story-upvote-button.component';
import {MainStoryShareButtonsComponent} from './components/story-share-buttons/story-share-buttons.component';
import {MainStoryActionsComponent} from './components/story-actions/story-actions.component';
import {MainStoryAuthorComponent} from './components/story-author/story-author.component';
import {MainStoryPayerBadgeComponent} from './components/story-payer-badge/story-payer-badge.component';

const routes: Routes = [
  {
    path: '',
    component: MainContainerComponent,
    children: [
      {path: 'about', component: MainAboutComponent},
      {path: ':username/:storyId', component: MainStoryComponent},
      {
        path: '',
        redirectTo: '/welcome',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  declarations: [
    MainContainerComponent,
    MainAboutComponent,
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
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [MainContainerComponent]
})
export class MainModule {
}
