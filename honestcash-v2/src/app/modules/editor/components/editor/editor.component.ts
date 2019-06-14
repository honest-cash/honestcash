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
import {EDITOR_EDITING_MODES} from '../header/header.component';

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
  @Input() public editingMode: EDITOR_EDITING_MODES;
  public EDITOR_EDITING_MODES = EDITOR_EDITING_MODES;
  public saveStatus: EDITOR_STATUS;
  public hasEditorInitialized = false;
  public editor: any;
  public editorConfig: any;
  public editor$: Observable<EditorState>;
  public editorSub: Subscription;
  public isLoaded = false;
  public updatedTitle = '';
  readonly isPlatformBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private store: Store<AppStates>,
    private editorService: EditorService,
    private scriptService: ScriptService,
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);

    if (this.isPlatformBrowser) {
      const editorToolsToLoad = [
        this.scriptService.loadScript('https://cdn.jsdelivr.net/npm/@editorjs/paragraph@2.5.1/dist/bundle.min.js'),
      ];

      if (this.editingMode === EDITOR_EDITING_MODES.Write || this.editingMode === EDITOR_EDITING_MODES.Edit) {
        editorToolsToLoad.push(
          this.scriptService.loadScript('https://cdn.jsdelivr.net/npm/@editorjs/header@2.2.4/dist/bundle.min.js'),
          this.scriptService.loadScript('https://cdn.jsdelivr.net/npm/@editorjs/image@2.3.1/dist/bundle.min.js'),
          this.scriptService.loadScript('https://cdn.jsdelivr.net/npm/@editorjs/link@2.1.3/dist/bundle.min.js'),
          this.scriptService.loadScript('https://cdn.jsdelivr.net/npm/@editorjs/code@2.4.1/dist/bundle.min.js'),
          this.scriptService.loadScript('https://cdn.jsdelivr.net/npm/@editorjs/embed@2.2.1/dist/bundle.min.js'),
        );
      }

      this.scriptService.loadScript('https://cdn.jsdelivr.net/npm/@editorjs/editorjs@2.14.0/dist/editor.min.js').pipe(
        concatMap(() => forkJoin(
          editorToolsToLoad
        ))
      ).subscribe(() => {
        this.editorConfig = {
          holder: 'editor',
          initialBlock: 'paragraph',
          onChange: this.onBodyChange.bind(this),
          placeholder: this.editingMode !== EDITOR_EDITING_MODES.Comment ? 'Write your story...' : 'Write your comment...',
          tools: {
            paragraph: { // this is shared by all modes
              class: Paragraph,
              inlineToolbar: true,
            },
          }
        };

        if (this.editingMode === EDITOR_EDITING_MODES.Write || this.editingMode === EDITOR_EDITING_MODES.Edit) {
          this.editorConfig.tools = {
            ...this.editorConfig.tools,
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
            code: CodeTool,
          };
        }

        this.editor = new EditorJS(this.editorConfig);
        this.editor.isReady.then(() => {
          this.store.dispatch(new EditorLoad());
        });
      });

    }
    this.editor$ = this.store.select(selectEditorState);
  }

  public ngOnInit() {
    // remove any leftover post in localstorage
    this.editorService.removeLocallySavedPost();
    this.editorSub = this.editor$
    .subscribe((editorState: EditorState) => {
      this.saveStatus = editorState.status;

      if (this.isPlatformBrowser && this.editor && !this.isLoaded && this.saveStatus === EDITOR_STATUS.Initialized && this.story) {
        if (!this.story.title && this.story.parentPost && this.story.parentPost.title) {
          this.story.title = `RE: ${this.story.parentPost.title}`;
        }
        this.editor.isReady.then(() => {
          if (this.story.bodyJSON && this.story.bodyJSON.length) {
            this.editor.blocks.clear();
            this.editor.blocks.render({blocks: <Block[]>this.story.bodyJSON});
          }
          this.editorService.savePostLocally(this.story);
          this.isLoaded = true;
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

  onTitleBlur() {
    this.story.title = this.updatedTitle;
    this.store.dispatch(new EditorStoryPropertyChange({property: STORY_PROPERTIES.Title, value: this.story.title}));
  }

  onTitleChange($event: any) {
    // InputEvent interface is not yet introduced in Typescript
    // it is required to install a third party types file @types/dom-inputevent
    // hence the any type
    this.updatedTitle = $event.target.innerText;
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
