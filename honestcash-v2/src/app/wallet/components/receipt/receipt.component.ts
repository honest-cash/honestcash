import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ITransaction, TRANSACTION_TYPES} from '../../models/transaction';
import Story from '../../../story/models/story';

@Component({
  selector: 'wallet-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class WalletReceiptComponent implements OnInit {

  public transactionType: TRANSACTION_TYPES;
  public TRANSACTION_TYPES = TRANSACTION_TYPES;
  public transaction: ITransaction;
  public story: Story;
  constructor(
    public activeModal: NgbActiveModal
  ) {

  }

  public ngOnInit() {
  }

}
