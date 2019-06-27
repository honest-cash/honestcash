import {NgModule} from '@angular/core';
import {MainContainerComponent} from './main-container.component';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../core/shared.module';
import {StoryComponent} from '../main/pages/story/story.component';
import {AboutComponent} from './pages/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: MainContainerComponent,
    children: [
      {path: 'about', component: AboutComponent},
      {path: ':username/:storyId', component: StoryComponent},
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
    AboutComponent,
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
