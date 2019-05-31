import {Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import Post from '../../../../shared/models/post';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {EDITOR_STATUS, State as EditorState} from '../../../../store/editor/editor.state';
import {EditorLoad, EditorStoryPropertyChange, EditorUnload} from '../../../../store/editor/editor.actions';
import {EditorService, STORY_PROPERTIES} from '../../services/editor.service';
import {Block} from '../../converters/json-to-html';
import {isPlatformBrowser} from '@angular/common';
import {ScriptService} from 'ngx-script-loader';
import {concatMap} from 'rxjs/operators';

// @todo editor-v2: get rid of the factory provider pattern, it should be immutable!
export const EDITOR_AUTO_SAVE = {
  ON: false,
  INTERVAL: 10 * 1000,
};

declare var EditorJS: any;
declare var EditorConfig: any;
declare var LinkTool: any;
declare var Embed: any;
declare var ImageTool: any;
declare var Header: any;
declare var Paragraph: any;
declare var CodeTool: any;

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  @Input() public story: Post;
  public saveStatus: EDITOR_STATUS;
  public hasEditorInitialized = false;
  readonly isPlatformBrowser: boolean;
  public editor: any;
  public editorConfig: any;
  public editor$: Observable<EditorState>;
  public editorSub: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private store: Store<AppStates>,
    private editorService: EditorService,
    private scriptService: ScriptService,
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);

    if (this.isPlatformBrowser) {
      this.scriptService.loadScript('https://cdn.jsdelivr.net/npm/@editorjs/editorjs@2.13.0/dist/editor.min.js').pipe(
        concatMap(() => forkJoin(
          this.scriptService.loadScript('https://cdn.jsdelivr.net/npm/@editorjs/header@2.2.3/dist/bundle.min.js'),
          this.scriptService.loadScript('https://cdn.jsdelivr.net/npm/@editorjs/image@2.3.0/dist/bundle.min.js'),
          this.scriptService.loadScript('https://cdn.jsdelivr.net/npm/@editorjs/link@2.1.2/dist/bundle.min.js'),
          this.scriptService.loadScript('https://cdn.jsdelivr.net/npm/@editorjs/paragraph@2.5.0/dist/bundle.min.js'),
          this.scriptService.loadScript('https://cdn.jsdelivr.net/npm/@editorjs/code@2.4.1/dist/bundle.min.js'),
          this.scriptService.loadScript('https://cdn.jsdelivr.net/npm/@editorjs/embed@2.2.0/dist/bundle.min.js'),
        ))
      ).subscribe(() => {
        this.editorConfig = {
          holder: 'editor',
          autofocus: true,
          initialBlock: 'paragraph',
          tools: {
            header: {
              class: Header,
              inlineToolbar: true,
            },
            link: {
              class: LinkTool,
              inlineToolbar: true,
            },
            image: {
              class: ImageTool,
              inlineToolbar: true,
              config: {
                uploader: {
                  uploadByFile: this.uploadImage.bind(this),
                  uploadByUrl: this.downloadImageFromUrlAndUpload.bind(this)
                }
              }
            },
            embed: Embed,
            paragraph: {
              class: Paragraph,
              inlineToolbar: true,
            },
            code: CodeTool,
          },
          onChange: this.onBodyChange.bind(this)
        };

        this.editor = new EditorJS(this.editorConfig);
        this.editor.isReady.then(() => {
          this.store.dispatch(new EditorLoad());
        });
      });

    }
    this.editor$ = this.store.select(selectEditorState);
  }

  public ngOnInit() {
    this.editorSub = this.editor$
    .subscribe((editorState: EditorState) => {
      this.saveStatus = editorState.status;
      if (this.isPlatformBrowser && this.editor) {
        this.editor.isReady.then(() => {
          if (this.saveStatus === EDITOR_STATUS.Loaded && this.story.bodyJSON) {
            this.editor.blocks.clear();
            this.editor.blocks.render({blocks: <Block[]>this.story.bodyJSON});
          }
        });
      }
    });
  }

  onBodyChange() {
    if (this.isPlatformBrowser && this.editor) {
      this.editor.saver.save()
      .then((outputData) => {
        this.story.bodyJSON = <Block[]>outputData.blocks;
        this.store.dispatch(new EditorStoryPropertyChange({property: STORY_PROPERTIES.BodyJSON, value: this.story.bodyJSON}));
      });
    }
  }

  onTitleChange(title: string) {
    this.store.dispatch(new EditorStoryPropertyChange({property: STORY_PROPERTIES.Title, value: title}));
  }

  autoGrow(oField) {
    if (oField.scrollHeight > oField.clientHeight) {
      oField.style.height = oField.scrollHeight + 'px';
    }
  }

  public uploadImage(file: File) {
    return this.editorService.uploadImage(file).toPromise().then((response) => {
      return {
        success: 1,
        file: {
          url: response.files[0].url
        }
      };
    });
  }

  public downloadImageFromUrlAndUpload(url: string) {
    return this.editorService.downloadImageFromUrl(url).toPromise().then(response => {
      return {
        success: 1,
        file: {
          url: response.files[0].url
        }
      };
    });
  }

  public ngOnDestroy() {
    if (this.isPlatformBrowser && this.editor && this.editor.destroy) {
      this.editor.destroy();
      this.store.dispatch(new EditorUnload());
    }
    if (this.editorSub) {
      this.editorSub.unsubscribe();
    }
  }
}
