import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'app-welcome-card-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class CardFooterComponent {
  @HostBinding('class') class = 'card-footer';
  @Input() text;
  @Input() anchor;
  @Input() to;
}
