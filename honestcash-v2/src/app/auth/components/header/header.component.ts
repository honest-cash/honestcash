import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'auth-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AuthHeaderComponent {
  @HostBinding('class') public class = '';
}
