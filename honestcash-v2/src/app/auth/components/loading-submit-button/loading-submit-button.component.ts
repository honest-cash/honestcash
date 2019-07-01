import {Component, Input} from '@angular/core';

@Component({
  selector: 'auth-loading-submit-button',
  templateUrl: './loading-submit-button.component.html',
  styleUrls: ['./loading-submit-button.component.scss']
})
export class AuthLoadingSubmitButtonComponent {
  @Input() public isLoading: boolean;
  @Input() public loadingText: string;
  @Input() public text: string;
  @Input() public btnClass: string;

}
