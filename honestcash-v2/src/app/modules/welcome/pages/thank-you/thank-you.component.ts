import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStates } from '../../../../app.states';
import User from '../../../../models/user';


@Component({
  selector: 'app-welcome-page-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  @HostBinding('class') class = 'w-full flex flex-wrap content-center items-center justify-center';
  @HostBinding('style.height') height = '75vh';
  @HostBinding('style.minHeight') minHeight = '75vh';

  isLoading = false;
  user = new User();

  constructor(
    private store: Store<AppStates>
  ) {}

  ngOnInit() {}

}
