import {Component, Input} from '@angular/core';

export const AVATAR_DEFAULT_THUMBNAIL = 'https://png.pngtree.com/svg/20161027/631929649c.svg';

@Component({
  selector: 'core-avatar',
  templateUrl: `./avatar.component.html`,
  styleUrls: ['./avatar.component.scss'],
})
export class CoreAvatarComponent {
  public _src = '';
  @Input() public large = false;

  @Input()
  public set src(src: string) {
    src = src.trim();
    console.log('sdrc', src);
    if (src && src !== '') {
      this._src = src;
    } else {
      this._src = AVATAR_DEFAULT_THUMBNAIL;
    }
  }

  public get src(): string {
    return this._src;
  }
}
