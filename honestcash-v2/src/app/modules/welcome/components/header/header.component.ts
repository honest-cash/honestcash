import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-welcome-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @HostBinding('class') class = '';
}
