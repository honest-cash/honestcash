import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates} from './app.states';
import {Logger} from './core/services/logger.service';
import {AppLoad} from './core/store/app/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private logger: Logger;

  constructor(
    private store: Store<AppStates>
  ) {
    this.logger = new Logger('AppComponent');

    this.store.dispatch(new AppLoad());
  }

  ngOnInit() {
  }
}
