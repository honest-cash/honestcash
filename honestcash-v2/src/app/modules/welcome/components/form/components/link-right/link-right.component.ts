import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-welcome-form-link-right',
  templateUrl: './link-right.component.html',
  styleUrls: ['./link-right.component.scss']
})
export class FormLinkRightComponent implements OnInit {
  @Input() anchor;
  @Input() to;
  @HostBinding('class') class = 'w-full text-sm font-bold text-white text-right mb-2';

  constructor(

  ) {

  }

  ngOnInit() {

  }

}
