import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates} from './app.states';
import {CoreLoad} from '../core/store/core.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private store: Store<AppStates>
  ) {
    this.store.dispatch(new CoreLoad());
  }
}
