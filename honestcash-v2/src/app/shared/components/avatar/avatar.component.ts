import {Component, Input} from '@angular/core';

@Component({
             selector: 'app-avatar',
             template: `<img class="avatar" [ngClass]="{'large': large, 'small': !large}" [src]="src"/>`,
             styles: [
               '.avatar {\n' +
               '  border-style: solid;\n' +
               '  border-color: #e7e7e7;\n' +
               '  border-width: 1px;\n' +
               '  border-radius: 50%;\n' +
               '}' +
               '.avatar.large {\n' +
               '  height: 45px;\n' +
               '  width: 45px;\n' +
               '}' +
               '.avatar.small {\n' +
               '  height: 34px;\n' +
               '  width: 34px;\n' +
               '}'
             ]
           })
export class AvatarComponent {
  private _src = '';
  @Input() large = false;
  @Input()
  set src(src: string) {
    this._src = (src && src.trim()) || 'https://png.pngtree.com/svg/20161027/631929649c.svg';
  }

  get src(): string { return this._src; }
}
