import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StoryContainerComponent} from './story-container.component';
import {StoryComponent} from './components/story/story.component';

/**
 * - More specific routes should come first
 */
const routes: Routes = [
  {
    path: '',
    component: StoryContainerComponent,
    children: [
      {
        path: ':username/:storyIdOrAlias',
        component: StoryComponent,
      },
      {
        path: 'post/:storyIdOrAlias',
        component: StoryComponent,
      },
      {
        path: 'post/:username/:storyIdOrAlias',
        component: StoryComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoryRoutingModule {
}
