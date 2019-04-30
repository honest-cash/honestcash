import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
  }
];

@NgModule({
  declarations: [
    AboutComponent,
  ],
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    CommonModule
  ],
  providers: [
  ],
  bootstrap: []
})
export class AppModule { }
