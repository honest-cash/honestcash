import {Component, Input} from '@angular/core';

export const AVATAR_DEFAULT_THUMBNAIL = 'https://png.pngtree.com/svg/20161027/631929649c.svg';

@Component({
  selector: 'shared-avatar',
  templateUrl: `./avatar.component.html`,
  styleUrls: ['./avatar.component.scss'],
})
export class SharedAvatarComponent {
  public _src = '';
  @Input() public large = false;

  @Input()
  public set src(src: string) {
    this._src = (src && src.trim()) || AVATAR_DEFAULT_THUMBNAIL;
  }

  public get src(): string {
    return this._src;
  }
}
