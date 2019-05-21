import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Link from '@editorjs/link';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import Paragraph from '@editorjs/paragraph';
import Code from '@editorjs/code';
import Marker from '@editorjs/marker';
import Delimiter from '@editorjs/delimiter';
import {animate, state, style, transition, trigger} from '@angular/animations';
import Post from '../../../core/models/post';
import {EDITOR_SAVE_STATUS, State as EditorState} from '../../../core/store/editor/editor.state';
import {interval, Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../app.states';
import {EditorService, STORY_PROPERTIES} from '../services/editor.service';
import {
  EditorChange,
  EditorLoad,
  EditorStoryPropertySave,
  EditorStoryPublish,
  EditorStorySave,
  EditorStorySaveAndPublish
} from '../../../core/store/editor/editor.actions';
import {EDITOR_AUTO_SAVE, HonestEditorConfig} from '../pages/new/editor-new.component';
import {PublishModalComponent} from '../components/publish-modal/publish-modal.component';

type PaneType = 'first' | 'second';

@Component({
  selector: 'app-editor-embeddable',
  templateUrl: './embed.component.html',
  styleUrls: ['./embed.component.scss'],
  animations: [
    trigger('slide', [
      state('first', style({transform: 'translateX(0)'})),
      state('second', style({transform: 'translateX(-50%)'})),
      transition('* => *', animate(300))
    ])
  ]
})
export class EmbeddableEditorComponent implements OnInit, OnDestroy {
  @Input() activePane: PaneType = 'first';
  @ViewChild('modalBody') modalBody: ElementRef;

  public saveStatus: EDITOR_SAVE_STATUS;
  readonly editor: EditorJS;
  private editorConfig: HonestEditorConfig = {
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
      image: {
        class: Image,
        inlineToolbar: true,
        config: {} // needs to be populated in constructor for upload
      },
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
  private autosaveIntervalObservable = interval(EDITOR_AUTO_SAVE.INTERVAL);
  private autoSaveInterval$: Subscription;

  constructor(
    private store: Store<AppStates>,
    private modalService: NgbModal,
    private editorService: EditorService,
  ) {
    this.editorConfig.tools.image.config = {
      uploader: {
        uploadByFile: this.uploadImage.bind(this),
        uploadByUrl: this.downloadImageFromUrlAndUpload.bind(this)
      }
    };
    this.editor = new EditorJS(this.editorConfig);
    this.editor.isReady.then(() => {
      this.store.dispatch(new EditorLoad());
    });
    this.editorStateObservable = this.store.select(selectEditorState);
    // explicitly turn autosave on write mode
    // so that on edit mode it is default by default even if forgotten
    EDITOR_AUTO_SAVE.ON = true;
  }

  ngOnInit() {
    this.editorState$ = this.editorStateObservable
    .subscribe((editorState: EditorState) => {
      this.saveStatus = editorState.status;
      this.story = editorState.story;

      if (editorState.isLoaded && !this.hasEditorInitialized) {
        this.editor.blocks.clear();
        this.editor.blocks.render({blocks: <any[]>this.story.body});
        this.hasEditorInitialized = true;
      }
    });
  }

  onEditorChange() {
    this.editor.saver.save()
    .then((outputData) => {
      this.story.body = outputData.blocks;
      this.store.dispatch(new EditorChange(this.story));

      if (EDITOR_AUTO_SAVE.ON && this.saveStatus === EDITOR_SAVE_STATUS.NotSaved) {
        this.autoSaveInterval$ = this.autosaveIntervalObservable.subscribe(() => {
          this.store.dispatch(new EditorStoryPropertySave({story: this.story, property: STORY_PROPERTIES.Body}));
        });
      }
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
    modalRef.componentInstance.publishClick.subscribe(() => {
      if (this.saveStatus === EDITOR_SAVE_STATUS.NotSaved) {
        this.store.dispatch(new EditorStorySaveAndPublish(this.story));
      } else {
        this.store.dispatch(new EditorStoryPublish(this.story));
      }
    });
  }

  uploadImage(file: File) {
    return this.editorService.uploadImage(file).toPromise().then((response) => {
      return {
        success: 1,
        file: {
          url: response.files[0].url
        }
      };
    });
  }

  downloadImageFromUrlAndUpload(url: string) {
    return this.editorService.downloadImageFromUrl(url).toPromise().then(response => {
      return {
        success: 1,
        file: {
          url: response.files[0].url
        }
      };
    });
  }

  onBack() {
    this.activePane = 'first';
    this.modalBody.nativeElement.scrollTop = 0;
  }

  onNext() {
    this.activePane = 'second';
    this.modalBody.nativeElement.scrollTop = 0;
  }

  onSubmit(form) {
    console.log('form', form);
  }

  onPublish() {
    this.editor.saver.save().then((outputData) => {
      console.log('Article data: ', JSON.stringify(outputData.blocks, null, 2));
    }).catch((error) => {
      console.log('Saving failed: ', error);
    });
  }

  onDismiss() {
    this.editor.destroy();
    this.activeModal.dismiss();
  }

  ngOnDestroy() {
    if (this.editor && this.editor.destroy) {
      this.editor.destroy();
    }
  }

}
