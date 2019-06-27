import {NgModule} from '@angular/core';
import {BrandContainerComponent} from './brand-container.component';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './pages/about/about.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SharedModule} from '../../core/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: BrandContainerComponent,
    children: [
      {path: 'about', component: AboutComponent},
    ]
  },
];

@NgModule({
  declarations: [
    BrandContainerComponent,
    AboutComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [BrandContainerComponent]
})
export class BrandModule {
}
