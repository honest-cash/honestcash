import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-welcome-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @HostBinding('class') class = 'flex w-full';
  @HostBinding('style.height') height = '15vh';


  constructor(

  ) {

  }

  ngOnInit() {

  }

}
