import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { EditorService } from './editor.service';
import { Post, User } from '../../../shared/interfaces/index';
import { Router, ActivatedRoute } from '@angular/router';
import { Logger } from '../../../core';
import { BehaviorSubject, Observable } from 'rxjs';

import blankBody from './blankBody';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../../store/app.states';

const log = new Logger('EditorCoreComponent');

@Component({
  selector: 'app-home',
  templateUrl: './editor-core.component.html',
  styleUrls: ['./editor-core.component.scss']
})
export class EditorCoreComponent implements OnDestroy, AfterViewInit {
  post: Post;
  user: User;
  mode: 'write' | 'writeFresh' | 'edit' | 'respond';
  postId: number;
  parentPostId: number;
  getUser: BehaviorSubject<User>;
  editorLoaded: BehaviorSubject<string>;
  authState: Observable<any>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private editorService: EditorService,
    private postService: PostService,
    private store: Store<AppState>,
  ) {
    this.authState = this.store.select(selectAuthState);

    const streams = this.editorService.getEventStreams();
    this.editorLoaded = streams.editorLoaded;
  }

  ngAfterViewInit() {
    this.authState.subscribe((authState) => {
      if (!authState.user) {
        return;
      }

      this.user = authState.user;
    });

    this.activatedRoute.url.subscribe(url => {
      if (!url.length) {
        return;
      }


      switch (url[0].path) {
        case 'edit':
          this.mode = 'edit';
          this.postId = Number(url[1].path);
          break;
        case 'response':
          this.mode = 'respond';
          this.parentPostId = Number(url[1].path);
          break;
        default:
          this.mode = 'write';
      }

      let draft: any = {};

      if (this.mode === 'edit') {
        draft = {
          postId: this.postId
        };
      }

      const postLoader = this.postService.loadPostDraft(draft);

      postLoader.subscribe(this.subscribeSuccess, this.subscribeError);
    });
  }

  ngOnDestroy() {
    this.editorLoaded.unsubscribe();
  }

  private subscribeSuccess = (post: Post) => {
    if (!this.post) {
      if (post.userId !== this.user.id) {
        return this.router.navigate(['/not-authorized']);
      }

      if (this.mode === 'respond') {
        post.parentPostId = this.parentPostId;
        this.postService.getPost(this.parentPostId).subscribe(p => {
          post.parentPost = p;
          post.bodyMD = blankBody;
          this.post = post;

          this.editorService.setEditor();

          this.editorLoaded.subscribe(
            status => {},
            error => {},
            () => {
              this.editorService.setPost(this.post);
            }
          );
        });
      }

      if (this.mode === 'write' && !post.bodyMD) {
        post.bodyMD = blankBody;
        this.post = post;

        this.editorService.setEditor();

        this.editorLoaded.subscribe(
          status => {},
          error => {},
          () => {
            this.editorService.setPost(this.post);
          }
        );
      } else if ((this.mode === 'write' || this.mode === 'writeFresh') && post.bodyMD) {
        this.post = post;

        this.editorService.setEditor();

        this.editorLoaded.subscribe(
          status => {},
          error => {},
          () => {
            this.editorService.setPost(this.post);
          }
        );
      } else {
        this.post = post;

        this.editorService.setEditor();

        this.editorLoaded.subscribe(
          status => {},
          error => {},
          () => {
            this.editorService.setPost(this.post);
          }
        );
      }
    }
  }

  private subscribeError = (error: any) => {
    log.error(error);
    this.router.navigate(['/http-error']);
  }
}
