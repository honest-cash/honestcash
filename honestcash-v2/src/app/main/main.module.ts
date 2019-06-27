import {NgModule} from '@angular/core';
import {MainContainerComponent} from './main-container.component';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SharedModule} from '../../core/shared.module';
import {StoryComponent} from '../main/pages/story/story.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {path: ':username/:storyId', component: StoryComponent}
];

@NgModule({
  declarations: [
    MainContainerComponent,
    StoryComponent,
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
