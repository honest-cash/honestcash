import {Component, OnInit, Input, HostBinding} from '@angular/core';

@Component({
  selector: 'app-welcome-fat-loading-button',
  templateUrl: './fat-loading-button.component.html',
  styleUrls: ['./fat-loading-button.component.scss']
})
export class FatLoadingButtonComponent implements OnInit {
  // @todo - no types?
  @Input() isLoading;
  @Input() loadingText;
  @Input() text;

  constructor(

  ) {

  }

  ngOnInit() {

  }

}
