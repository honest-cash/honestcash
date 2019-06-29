import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainStoryComponent} from './story.component';

/**
 * - More specific routes should come first
 */
const routes: Routes = [
  {
    path: ':username/:storyIdOrAlias',
    component: MainStoryComponent,
  },
  {
    path: 'post/:storyIdOrAlias',
    component: MainStoryComponent,
  },
  {
    path: 'post/:username/:storyIdOrAlias',
    component: MainStoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StoryRoutingModule {
}
