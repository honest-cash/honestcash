import {Component, Input} from '@angular/core';

@Component({
  selector: 'shared-honest-logo',
  templateUrl: './honest-logo.component.html',
  styleUrls: ['./honest-logo.component.scss']
})
export class SharedHonestLogoComponent {
  @Input() public width: number;
  @Input() public height: number;
}
