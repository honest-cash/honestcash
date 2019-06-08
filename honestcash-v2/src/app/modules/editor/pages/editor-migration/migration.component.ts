import {Component, ElementRef, HostBinding, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Block, convertBlockToHtml} from '../../converters/json-to-html';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../../app.states';
import Post from '../../../../shared/models/post';
import User from '../../../../shared/models/user';
import {EditorService} from '../../services/editor.service';
import {EDITOR_EDITING_MODES} from '../../components/header/header.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'editor-migration',
  templateUrl: './migration.component.html',
  styleUrls: ['./migration.component.scss']
})
export class EditorMigrationComponent implements OnInit {
  @HostBinding('class') class = 'mb-auto mt-auto';
  @ViewChildren('body') body: QueryList<ElementRef>;
  @ViewChildren('bodyJSON') bodyJSON: QueryList<ElementRef>;
  public EDITOR_EDITING_MODES = EDITOR_EDITING_MODES;
  public story: Post;
  public user: User;
  public isLoading = true;

  constructor(
    private store: Store<AppStates>,
    private activatedRoute: ActivatedRoute,
    private editorService: EditorService,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.editorService.getPost(params.storyId).subscribe((story: Post) => {
        this.story = story;
      });
    });
  }

  ngOnInit() {
  }

  private convertBlockToHtml(block: Block) {
    return convertBlockToHtml(block);
  }
}
