import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
})
export class MainContainerComponent {
  @HostBinding('class') public class = 'd-block bg-image';
  @HostBinding('style.minHeight') public minHeight = '100vh';
}
