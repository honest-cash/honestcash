import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-welcome-card-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class CardHeaderComponent {
  @HostBinding('class') class = '';
}
