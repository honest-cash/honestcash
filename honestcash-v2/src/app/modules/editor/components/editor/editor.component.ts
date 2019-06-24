import {Component, ElementRef, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import Post from '../../../../shared/models/post';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {EDITOR_STATUS, State as EditorState} from '../../../../store/editor/editor.state';
import {EditorLoad, EditorStoryPropertyChange, EditorUnload} from '../../../../store/editor/editor.actions';
import {EditorService} from '../../services/editor.service';
import {Block} from '../../converters/json-to-html';
import {isPlatformBrowser} from '@angular/common';
import {ScriptService} from 'ngx-script-loader';
import {concatMap} from 'rxjs/operators';
import {EDITOR_EDITING_MODES} from '../header/header.component';
import {STORY_PROPERTIES} from '../../shared/editor.story-properties';

// @todo editor-v2: get rid of the factory provider pattern, it should be immutable!
export const EDITOR_AUTO_SAVE = {
  ON: false,
  INTERVAL: 10 * 1000,
};

interface EditorConfig {
  holder: string;
  initialBlock: string;
  onChange: () => any;
  onReady: () => any;
  data: {
    blocks: Block[]
  };
  placeholder: string;
  tools: {
    [element: string]: {
      class: string;
      inlineToolbar?: boolean;
      placeholder?: string;
      config?: any;
    }
  };
}

declare var EditorJS: any;
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
  @Input() public editingMode: EDITOR_EDITING_MODES;
  @ViewChild('titleElement') public titleElement: ElementRef;
  public EDITOR_EDITING_MODES = EDITOR_EDITING_MODES;
  public saveStatus: EDITOR_STATUS;
  public hasEditorInitStarted = false;
  public hasEditorInitialized = false;
  public shouldEditorAllowTitleAndCustomElements = false;
  public editor: any;
  public editor$: Observable<EditorState>;
  public editorSub: Subscription;
  public updatedTitle = '';
  public story: Post;
  private readonly isPlatformBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private store: Store<AppStates>,
    private editorService: EditorService,
    private scriptService: ScriptService,
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
    this.editor$ = this.store.select(selectEditorState);
  }

  public ngOnInit() {
    this.editorSub = this.editor$
    .subscribe((editorState: EditorState) => {
      this.saveStatus = editorState.status;
      this.story = editorState.story;
      if (Object.keys(this.story).length) {
        this.initEditor();
      }
    });
  }

  public onBodyChange() {
    if (this.isPlatformBrowser && this.editor) {
      this.editor.saver.save()
      .then((outputData) => {
        this.story.bodyJSON = <Block[]>outputData.blocks;
        this.store.dispatch(new EditorStoryPropertyChange({property: STORY_PROPERTIES.BodyJSON, value: this.story.bodyJSON}));
      });
    }
  }

  public onTitleBlur() {
    this.story.title = this.updatedTitle;
    this.titleElement.nativeElement.innerHTML = this.updatedTitle;
    this.store.dispatch(new EditorStoryPropertyChange({property: STORY_PROPERTIES.Title, value: this.story.title}));
  }

  public onTitleChange($event: any) {
    // InputEvent interface is not yet introduced in Typescript
    // it is required to install a third party types file @types/dom-inputevent
    // hence the any type
    this.updatedTitle = $event.target.innerText;
  }

  public uploadImage(file: File) {
    return this.editorService.uploadImage(file);
  }

  public downloadImageFromUrlAndUpload(url: string) {
    return this.editorService.uploadRemoteImage(url);
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

  private initEditor() {
    if (this.isPlatformBrowser && !this.hasEditorInitStarted && !this.hasEditorInitialized) {
      this.shouldEditorAllowTitleAndCustomElements = (
          this.editingMode === EDITOR_EDITING_MODES.Write ||
          this.editingMode === EDITOR_EDITING_MODES.Edit
        ) &&
        this.story &&
        !this.story.parentPostId;
      this.hasEditorInitStarted = true;

      this.scriptService.loadScript('https://cdn.jsdelivr.net/npm/@editorjs/editorjs@2.14.0/dist/editor.min.js').pipe(
        concatMap(() => forkJoin(
          this.getEditorScripts()
        ))
      ).subscribe(() => {
        const editorConfig = this.getEditorConfig();
        this.editor = new EditorJS(editorConfig);
        this.setupEditorTitle();
      });

    }
  }

  private onEditorReady() {
    this.store.dispatch(new EditorLoad());
    this.hasEditorInitialized = true;
  }

  private getEditorScripts(): Observable<Event>[] {
    const editorScripts = [
      this.scriptService.loadScript('https://cdn.jsdelivr.net/npm/@editorjs/paragraph@2.5.1/dist/bundle.min.js'),
    ];

    if (this.shouldEditorAllowTitleAndCustomElements) {
      editorScripts.push(
        ...[
          this.scriptService.loadScript('https://cdn.jsdelivr.net/npm/@editorjs/header@2.2.4/dist/bundle.min.js'),
          this.scriptService.loadScript('https://cdn.jsdelivr.net/npm/@editorjs/image@2.3.1/dist/bundle.min.js'),
          this.scriptService.loadScript('https://cdn.jsdelivr.net/npm/@editorjs/embed@2.2.1/dist/bundle.min.js')
        ]
      );
    }

    return editorScripts;
  }

  private getEditorConfig(): EditorConfig {
    const editorConfig: EditorConfig = {
      holder: 'editor',
      initialBlock: 'paragraph',
      onChange: this.onBodyChange.bind(this),
      onReady: this.onEditorReady.bind(this),
      data: {
        blocks: this.story.bodyJSON
      },
      placeholder: this.editingMode !== EDITOR_EDITING_MODES.Comment ? 'Write your story...' : 'Write your comment...',
      tools: {
        paragraph: { // this is shared by all modes
          class: Paragraph,
          inlineToolbar: true,
        },
      }
    };

    if (this.shouldEditorAllowTitleAndCustomElements) {
      editorConfig.tools = {
        ...editorConfig.tools,
        header: {
          class: Header,
          inlineToolbar: false,
        },
        image: {
          class: ImageTool,
          inlineToolbar: false,
          config: {
            uploader: {
              uploadByFile: this.uploadImage.bind(this),
              uploadByUrl: this.downloadImageFromUrlAndUpload.bind(this)
            }
          }
        },
        embed: {
          class: Embed,
          inlineToolbar: false,
        },
      };
    }

    return editorConfig;
  }

  private setupEditorTitle() {
    if (this.story.title && this.story.title !== '') {
      this.updatedTitle = this.story.title;
      if (this.titleElement && this.titleElement.nativeElement) {
        this.titleElement.nativeElement.innerHTML = this.updatedTitle;
      }
    } else if (!this.story.title && this.story.parentPost && this.story.parentPost.title) {
      this.story.title = `RE: ${this.story.parentPost.title}`;
    }
  }
}


