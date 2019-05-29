import {Component, HostBinding, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditorEmbeddableComponent} from '../embeddable-editor/embeddable.component';

@Component({
  selector: 'editor-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.scss']
})
export class EditorEditButtonComponent implements OnInit {
  @HostBinding('class') public class = 'd-flex align-items-center mr-4';

  constructor(
    private modalService: NgbModal,
  ) {
  }

  ngOnInit() {
  }

  openEditorModal() {
    const modalRef = this.modalService.open(EditorEmbeddableComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });
  }
}
