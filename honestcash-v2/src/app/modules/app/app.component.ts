import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
})
export class AppContainerComponent implements OnInit {
  @HostBinding('class') class = 'bg-image text-white flex flex-col flex-wrap w-full items-center justify-center';

  constructor(
  ) {
  }

  ngOnInit() {
  }



}
