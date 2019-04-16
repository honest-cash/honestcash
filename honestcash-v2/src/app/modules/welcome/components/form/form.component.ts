import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-welcome-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() onSubmit;
  @HostBinding('class') class = 'flex w-1/6 flex-wrap mx-auto items-center justify-center';

  constructor(

  ) {

  }

  ngOnInit() {

  }

}
