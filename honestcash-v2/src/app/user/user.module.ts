import {NgModule} from '@angular/core';
import {AuthWelcomeComponent} from '../auth/pages/welcome/welcome.component';
import {UserContainerComponent} from './user-container.component';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {UnauthorizedGuard} from 'core/shared/guards/unauthorized.guard';
import {SharedModule} from '../../core/shared.module';

const routes: Routes = [
  {
    path: '',
    component: UserContainerComponent,
    /*children: [
      /!*{
        path: 'profile',
        component: AuthWelcomeComponent,
        canActivate: [UnauthorizedGuard]
      },*!/
    ]*/
  },
];

@NgModule({
  declarations: [
    UserContainerComponent,
  ],
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [UserContainerComponent]
})
export class UserModule {
}
