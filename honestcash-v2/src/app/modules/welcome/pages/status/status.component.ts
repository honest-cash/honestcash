import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../../app.states';
import { GetStatus } from '../../../../core/store/auth/auth.actions';

@Component({
  selector: 'app-welcome-page-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @HostBinding('style.height') height = '65vh';

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new GetStatus);
  }

}
