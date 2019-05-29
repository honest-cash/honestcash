import {Component, HostBinding, Input, OnInit} from '@angular/core';
import Post from '../../../../shared/models/post';

@Component({
  selector: 'editor-paid-section-unlocker',
  templateUrl: './paid-section-unlocker.component.html',
  styleUrls: ['./paid-section-unlocker.component.scss']
})
export class EditorPaidSectionUnlockerComponent implements OnInit {
  @HostBinding('class') class = 'd-flex align-items-center';
  @Input() public story: Post;

  constructor() {
  }

  ngOnInit() {
  }
}
