import {Component, OnDestroy, OnInit} from '@angular/core';
import EditorJS, {EditorConfig} from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Link from '@editorjs/link';
import SimpleImage from '@editorjs/simple-image';
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
import {EditorChange, EditorLoad, EditorStoryPublish, EditorStorySave, EditorUnload} from '../../../../core/store/editor/editor.actions';
import {EDITOR_SAVE_STATUS, State as EditorState} from '../../../../core/store/editor/editor.state';
import {Observable, Subscription} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PublishModalComponent} from '../../components/publish-modal/publish-modal.component';

export const EDITOR_AUTO_SAVE = {
  on: true,
  interval: 5000,
};

@Component({
  selector: 'app-editor-write',
  templateUrl: './editor-new.component.html',
  styleUrls: ['./editor-new.component.scss']
})
export class EditorNewComponent implements OnInit, OnDestroy {
  public saveStatus: EDITOR_SAVE_STATUS = EDITOR_SAVE_STATUS.NotSaved;

  readonly editor: EditorJS;
  readonly editorConfig: EditorConfig = {
    holder: 'editor',
    autofocus: true,
    initialBlock: 'paragraph',
    tools: {
      header: {
        class: Header,
        inlineToolbar: true,
      },
      link: {
        class: Link,
        inlineToolbar: true,
      },
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
    onChange: this.onEditorChange.bind(this)
  };
  private editorStateObservable: Observable<EditorState>;
  private editorState$: Subscription;
  private story: Post;
  private hasEditorInitialized = false;
  constructor(
    private store: Store<AppStates>,
    private modalService: NgbModal,
  ) {
    this.editor = new EditorJS(this.editorConfig);
    this.editor.isReady.then(() => {
      this.store.dispatch(new EditorLoad());
    });
    this.editorStateObservable = this.store.select(selectEditorState);
  }

  ngOnInit() {
    this.editorState$ = this.editorStateObservable
      .subscribe((editorState: EditorState) => {
        if (editorState.isLoaded && !this.hasEditorInitialized) {
          this.story = editorState.story;
          this.editor.blocks.clear();
          this.editor.blocks.render({blocks: <any[]>this.story.body});
          this.hasEditorInitialized = true;
        }
        this.saveStatus = editorState.status;
        if (this.saveStatus === EDITOR_SAVE_STATUS.Published) {
          this.modalService.dismissAll();
        }
      });
  }

  onEditorChange() {
    this.editor.saver.save()
      .then((outputData) => {
        this.story.body = outputData.blocks;
        this.store.dispatch(new EditorChange(this.story));
      });
  }

  saveDraftStory() {
    this.editor.saver.save()
      .then((outputData) => {
        this.story.body = outputData.blocks;
        this.store.dispatch(new EditorStorySave(this.story));
      });
  }

  publishStory() {
    const modalRef = this.modalService.open(PublishModalComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });
    modalRef.componentInstance.onPublishClick.subscribe(() => {
      this.store.dispatch(new EditorStoryPublish(this.story));
    });
  }

  ngOnDestroy() {
    if (this.editor && this.editor.destroy) {
      this.editor.destroy();
      this.store.dispatch(new EditorUnload());
    }
    this.editorState$.unsubscribe();
  }
}
