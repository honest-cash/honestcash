import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome-container.component.html',
  styleUrls: ['./welcome-container.component.scss'],
})
export class WelcomeContainerComponent {
  @HostBinding('class') public class = 'd-block bg-image';
  @HostBinding('style.minHeight') public minHeight = '100vh';
}
