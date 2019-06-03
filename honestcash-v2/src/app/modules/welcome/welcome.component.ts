import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeContainerComponent implements OnInit {
  @HostBinding('class') class = 'd-block bg-image';
  @HostBinding('style.minHeight') minHeight = '100vh';

  constructor() {
  }

  ngOnInit() {
  }

}
