import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-welcome-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {
  @HostBinding('class') class = 'flex w-full flex-wrap w-full items-center justify-center mb-8';

  @Input() title;
  @Input() title2;
  @Input() description;
  @Input() black;

  constructor() {

  }

  ngOnInit() {
    if (this.black !== undefined) {
      this.class += ' text-black';
    } else {
      this.class += ' text-white';
    }
  }

}
