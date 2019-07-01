import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StoryComponent} from './story.component';

/**
 * - More specific routes should come first
 */
const routes: Routes = [
  {
    path: '',
    component: StoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoryRoutingModule {
}
