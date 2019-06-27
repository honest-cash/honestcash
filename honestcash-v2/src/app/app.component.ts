import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates} from './app.states';
import {MainLoad} from './main/store/main.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {


  constructor(
    private store: Store<AppStates>
  ) {
    this.store.dispatch(new MainLoad());
  }
}
