import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
})
export class WelcomeContainerComponent implements OnInit {
  @HostBinding('class') class = 'bg-image text-white flex flex-col flex-wrap w-full items-center justify-center';

  constructor() {
  }

  ngOnInit() {}

}
