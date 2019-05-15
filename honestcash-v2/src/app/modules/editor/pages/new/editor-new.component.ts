import {Component, OnDestroy, OnInit} from '@angular/core';
import EditorJS, {EditorConfig} from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Link from '@editorjs/link';
import SimpleImage from '@editorjs/simple-image';
import Checklist from '@editorjs/checklist';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import Paragraph from '@editorjs/paragraph';
import Code from '@editorjs/code';
import Marker from '@editorjs/marker';
import Delimiter from '@editorjs/delimiter';
import Post from '../../../../core/models/post';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {EditorLoad, EditorUnload} from '../../../../core/store/editor/editor.actions';
import {State as EditorState} from '../../../../core/store/editor/editor.state';
import {Subscription} from 'rxjs';
import {EmbeddableEditorComponent} from '../../embed/embed.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

export enum EDITOR_SAVE_STATUS {
  NotSaved = 'NOT_SAVED',
  Saved = 'SAVED',
  Saving = 'SAVING',
}

@Component({
  selector: 'app-editor-write',
  templateUrl: './editor-new.component.html',
  styleUrls: ['./editor-new.component.scss']
})
export class EditorNewComponent implements OnInit, OnDestroy {
  public saveStatus: EDITOR_SAVE_STATUS = EDITOR_SAVE_STATUS.NotSaved;

  readonly editor: EditorJS;
  private editorConfig: EditorConfig = {
    holder: 'editor',
    autofocus: true,
    initialBlock: 'paragraph',
    tools: {
      header: {
        class: Header,
        inlineToolbar: true,
      },
      link: Link,
      image: SimpleImage,
      /*checklist: {
        class: Checklist,
        inlineToolbar: true,
      },*/
      list: {
        class: List,
        inlineToolbar: true,
      },
      embed: Embed,
      quote: Quote,
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
      },
      code: Code,
      Marker: Marker,
      delimiter: Delimiter,
      /*warning: Warning,*/
    },
  };
  private editorState$: Subscription;
  private story: Post;
  constructor(
    private store: Store<AppStates>,
    private modalService: NgbModal,
  ) {
    this.editor = new EditorJS(this.editorConfig);
    this.editor.isReady.then(() => {
      this.store.dispatch(new EditorLoad());
    });
  }

  ngOnInit() {
    this.editorState$ = this.store.select(selectEditorState).subscribe((editorState: EditorState) => this.story = editorState.story);
  }

  saveDraftStory() {
    console.log('save');
    this.saveStatus = EDITOR_SAVE_STATUS.Saving;
    setTimeout(() => {
      // emulate update
      this.story.createdAt = '2019-04-22T10:42:12.000Z';
      this.story.updatedAt = '2019-05-12T08:06:35.000Z';
      this.saveStatus = EDITOR_SAVE_STATUS.Saved;
    }, 2000);
    /*this.editor.saver.save().then((outputData) => {
       console.log('Article data: ', JSON.stringify(outputData.blocks, null, 2));
     }).catch((error) => {
       console.log('Saving failed: ', error);
     });*/
  }

  publishStory() {
    console.log('publish');
    /*const modalRef = this.modalService.open(EmbeddableEditorComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });*/
  }

  ngOnDestroy() {
    if (this.editor && this.editor.destroy) {
      this.editor.destroy();
      this.store.dispatch(new EditorUnload());
    }
    this.editorState$.unsubscribe();
  }
}
