import {Component, ElementRef, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import Story from '../../../story/models/story';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../app.states';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {EditorLoad, EditorStoryPropertyChange, EditorUnload} from '../../store/editor.actions';
import {EditorService} from '../../services/editor.service';
import {Block} from '../../shared/json-to-html';
import {isPlatformBrowser} from '@angular/common';
import {ScriptService} from 'ngx-script-loader';
import {concatMap} from 'rxjs/operators';
import {EDITOR_EDITING_MODES} from '../header/header.component';
import {EDITOR_STORY_PROPERTIES} from '../../shared/editor.story-properties';
import {editorScriptPaths} from '../../shared/editor.scripts-path';
import {EditorState} from '../../store/editor.state';

export const EDITOR_AUTO_SAVE_INTERVAL = 10 * 1000; // 10 mins

interface EditorConfig {
  holder: string;
  initialBlock: string;
  onChange?: () => any;
  onReady?: () => any;
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
  public hasEditorInitStarted = false;
  public hasEditorInitialized = false;
  public shouldEditorAllowTitleAndCustomElements = false;
  public editor: any;
  public editor$: Observable<EditorState>;
  public editorSub: Subscription;
  public updatedTitle = '';
  public story: Story;
  public editorPlaceholder = 'Write your story...';
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
      this.story = editorState.story;
      if (Object.keys(this.story).length && !this.hasEditorInitStarted && !this.hasEditorInitialized) {
        const loadSub = this.loadEditor();
        if (loadSub) {
          loadSub.subscribe(() => {
            this.initEditor();
          });
        }
      }
    });
  }

  public onBodyChange() {
    if (this.isPlatformBrowser && this.editor) {
      this.editor.saver.save()
      .then((outputData) => {
        this.story.bodyJSON = <Block[]>outputData.blocks;
        this.store.dispatch(new EditorStoryPropertyChange({property: EDITOR_STORY_PROPERTIES.BodyJSON, value: this.story.bodyJSON}));
      });
    }
  }

  public onTitleBlur() {
    this.story.title = this.updatedTitle;
    this.titleElement.nativeElement.innerHTML = this.updatedTitle;
    this.store.dispatch(new EditorStoryPropertyChange({property: EDITOR_STORY_PROPERTIES.Title, value: this.story.title}));
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

  public uploadRemoteImage(url: string) {
    return this.editorService.uploadRemoteImage(url);
  }

  public initEditor() {
    const editorConfig = this.getEditorConfig();
    this.editor = new EditorJS(editorConfig);
    this.setupEditorTitle();
  }

  public loadEditor() {
    if (this.isPlatformBrowser) {
      this.hasEditorInitStarted = true;
      this.setShouldEditorAllowTitleAndCustomElements();

      return this.scriptService
        .loadScript(editorScriptPaths.core)
        .pipe(
          concatMap(() => forkJoin
            (
              this.getEditorScripts()
            )
          )
      );
    }
  }

  public onEditorReady() {
    this.store.dispatch(new EditorLoad());
    this.hasEditorInitialized = true;
  }

  public setShouldEditorAllowTitleAndCustomElements() {
    this.shouldEditorAllowTitleAndCustomElements = (
        this.editingMode === EDITOR_EDITING_MODES.Write ||
        this.editingMode === EDITOR_EDITING_MODES.Edit
      ) &&
      this.story &&
      !this.story.parentPostId;
  }

  public getEditorScripts(): Observable<Event>[] {
    const editorScripts = [
      this.scriptService.loadScript(editorScriptPaths.plugins.paragraph), // do not disable, must have!
    ];

    if (this.shouldEditorAllowTitleAndCustomElements) {
      editorScripts.push(
        ...[
          this.scriptService.loadScript(editorScriptPaths.plugins.header),
          this.scriptService.loadScript(editorScriptPaths.plugins.image),
          this.scriptService.loadScript(editorScriptPaths.plugins.embed)
        ]
      );
    }

    return editorScripts;
  }

  public getEditorConfig(): EditorConfig {
    this.setupEditorPlaceholder();
    const editorConfig: EditorConfig = {
      holder: 'editor',
      initialBlock: 'paragraph',
      onChange: this.onBodyChange.bind(this),
      onReady: this.onEditorReady.bind(this),
      data: {
        blocks: this.story.bodyJSON
      },
      placeholder: this.editorPlaceholder,
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
              uploadByUrl: this.uploadRemoteImage.bind(this)
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

  public setupEditorPlaceholder() {
    if (this.editingMode === EDITOR_EDITING_MODES.Write) {
      this.editorPlaceholder = `Write your story...`;
    } else if (this.editingMode === EDITOR_EDITING_MODES.Edit) {
      this.editorPlaceholder = `Revise your story...`;
    } else if (this.editingMode === EDITOR_EDITING_MODES.Comment) {
      this.editorPlaceholder = `Write your comment...`;
    }

  }

  public setupEditorTitle() {
    if (this.story.title && this.story.title !== '') {
      this.updatedTitle = this.story.title;
      if (this.titleElement && this.titleElement.nativeElement) {
        this.titleElement.nativeElement.innerHTML = this.updatedTitle;
      }
    } else if (!this.story.title && this.story.parentPost && this.story.parentPost.title) {
      this.story.title = `RE: ${this.story.parentPost.title}`;
    }
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


