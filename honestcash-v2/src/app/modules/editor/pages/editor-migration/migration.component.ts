import {Component, ElementRef, HostBinding, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../../app.states';
import Post from '../../../../shared/models/post';
import User from '../../../../shared/models/user';
import {EditorService} from '../../services/editor.service';
import {EDITOR_EDITING_MODES} from '../../components/header/header.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Block} from '../../converters/json-to-html';
import {last} from 'rxjs/operators';

@Component({
  selector: 'editor-migration',
  templateUrl: './migration.component.html',
  styleUrls: ['./migration.component.scss']
})
export class EditorMigrationComponent implements OnInit {
  @HostBinding('class') class = 'mb-auto mt-auto';
  @ViewChildren('bodyMarkdownHTML') bodyMarkdownHTML: QueryList<ElementRef>;
  @ViewChildren('body') body: QueryList<ElementRef>;
  public EDITOR_EDITING_MODES = EDITOR_EDITING_MODES;
  public story: Post;
  public user: User;
  public isLoading = true;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private store: Store<AppStates>,
    private activatedRoute: ActivatedRoute,
    private editorService: EditorService,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.editorService.getPost(params.storyId).subscribe((story: Post) => {
        this.story = story;
        this.isLoading = false;
      });
    });
  }

  ngOnInit() {
  }

  @HostListener('document:keyup', ['$event']) onKeydown($event: KeyboardEvent) {
    if ($event.key === 'ArrowRight') {
      if (!this.isLoading) {
        this.isLoading = true;

        this.editorService.getRelativePost(this.story.id).subscribe((story: Post) => {
          this.story = story;
          this.isLoading = false;
        });
      }
    }

  }

  getBodyLength(stringOrArray: string | Block[]) {
    if (!stringOrArray) {
      return 0;
    }
    if (Array.isArray(stringOrArray)) {
      return stringOrArray.length;
    } else {
      const elements = stringOrArray
        .replace(new RegExp('\n\n<!-- -->', 'g'), '')
        .replace(/\n\n$/g, '')
        .split('\n\n');
      const _elements = [];

      elements.map(element => {
        if (element.trim() !== '') {
          _elements.push(element);
        }
        return element;
      });
      return _elements.length || 0;
    }

  }
}
