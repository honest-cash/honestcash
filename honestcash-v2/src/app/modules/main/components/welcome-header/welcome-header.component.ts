import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-welcome-header',
  templateUrl: './welcome-header.component.html',
  styleUrls: ['./welcome-header.component.scss']
})
export class WelcomeHeaderComponent {
  @HostBinding('class') public class = '';
}
