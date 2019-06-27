import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'auth-card-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class AuthCardFooterComponent {
  /* istanbul ignore next*/
  @HostBinding('class') public class = 'card-footer';
  @Input() public text;
  @Input() public anchor;
  @Input() public to;
}
