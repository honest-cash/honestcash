import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-welcome-form-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FormFooterComponent implements OnInit {
  @Input() text;
  @Input() anchor;
  @Input() to;
  @HostBinding('class') class = 'block w-full text-center text-white hover:text-white mt-2';

  constructor() {}

  ngOnInit() {}

}
