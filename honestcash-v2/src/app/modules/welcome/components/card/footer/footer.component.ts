import {Component, HostBinding, Input} from '@angular/core';

@Component({
  // @todo rename the selector -> its confusing!
  selector: 'app-welcome-shared-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class WelcomeSharedFooterComponent {
  @HostBinding('class') class = 'text-center';
  @Input() text;
  @Input() anchor;
  @Input() to;
}
