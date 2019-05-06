import { Component, OnInit, HostBinding } from '@angular/core';


@Component({
  selector: 'app-welcome-page-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  @HostBinding('class') class = 'flex flex-wrap items-center justify-center w-full h-full bg-hc-grey font-helvetica text-black';

  constructor(
  ) {
  }

  ngOnInit() {
  }

}
