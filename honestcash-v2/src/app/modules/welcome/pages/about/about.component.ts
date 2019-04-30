import { Component, OnInit, HostBinding } from '@angular/core';


@Component({
  selector: 'app-welcome-page-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  @HostBinding('style.height') height = '65vh';
  @HostBinding('style.minHeight') minHeight = '65vh';

  constructor(
  ) {
  }

  ngOnInit() {
  }

}
