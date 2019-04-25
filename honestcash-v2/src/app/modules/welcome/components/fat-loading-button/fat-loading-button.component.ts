import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-welcome-fat-loading-button',
  templateUrl: './fat-loading-button.component.html',
  styleUrls: ['./fat-loading-button.component.scss']
})
export class FatLoadingButtonComponent implements OnInit {

  @Input() isLoading;
  @Input() text;

  constructor(

  ) {

  }

  ngOnInit() {

  }

}
