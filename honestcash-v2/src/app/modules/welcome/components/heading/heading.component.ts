import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-welcome-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {
  @HostBinding('class') class = 'text-center p-1';

  @Input() title: string;
  @Input() title2: string;
  @Input() description: string;
  @Input() black: boolean;

  constructor() {

  }

  ngOnInit() {
  }

}
