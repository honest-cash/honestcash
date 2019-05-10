import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-welcome-loading-submit-button',
  templateUrl: './loading-submit-button.component.html',
  styleUrls: ['./loading-submit-button.component.scss']
})
export class LoadingSubmitButtonComponent {
  @Input() isLoading: boolean;
  @Input() loadingText: string;
  @Input() text: string;
  @Input() btnClass: string;

}
