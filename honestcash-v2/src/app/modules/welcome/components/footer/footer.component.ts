import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-welcome-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @HostBinding('class') class = 'flex w-full items-end justify-start';
  @HostBinding('style.height') height = '10vh';


  constructor(

  ) {

  }

  ngOnInit() {

  }

}
