import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'shared-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class SharedReceiptComponent implements OnInit {

  @Input() public receivers: any[];
  @Input() public amount: number;
  @Input() public txid: string;
  constructor(

  ) {

  }

  public ngOnInit() {

  }

}
