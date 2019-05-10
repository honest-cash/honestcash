import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeContainerComponent implements OnInit {
  @HostBinding('class') class = 'd-block bg-image text-white';

  constructor() {
  }

  ngOnInit() {}

}
