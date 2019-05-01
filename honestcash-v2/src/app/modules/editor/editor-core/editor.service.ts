import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Post } from '../../../shared/interfaces';
import { PostService } from '../../../core/services/post.service';

// @todo publish modal
// import { PostPublishModalComponent } from '@app/shell/components/modals/post-publish-modal/post-publish-modal.component';

// @ts-ignore
declare var HonestEditor: any;

export const editorEvents = {
  editor: {
    loaded: 'editor-loaded',
    changed: 'editor-changed'
  },
  post: {
    loaded: 'post-loaded',
    saved: 'post-saved',
    published: 'post-published',
    publishCancelled: 'publish-cancelled'
  }
};

/**
 *Regardless of the editor flavour, this is the common interface that needs to be implemented.
 */
interface IHonestEditorService {
  setEditor(domId: string): any;
}

@Injectable()
export class EditorService implements IHonestEditorService {
  private isEditorInitialized = false;
  private editorLoaded: BehaviorSubject<string> = new BehaviorSubject('none');
  private editorChanged: BehaviorSubject<string> = new BehaviorSubject('none');
  private postLoaded: BehaviorSubject<string> = new BehaviorSubject('none');
  private postChanged: BehaviorSubject<string> = new BehaviorSubject('none');
  private editor: any;
  private post: Post;
  private originalPost: Post;

  constructor(private postService: PostService) {}

  setEditor(domId: string = 'honest-editor') {
    if (!this.editor) {

      // get it from authStore
      const token =
        localStorage.getItem('HC_USER_TOKEN') ||
        (localStorage.getItem('HC_USER_CREDENTIALS') && JSON.parse(localStorage.getItem('HC_USER_CREDENTIALS')).token);

      this.editor = new HonestEditor(domId, {
        upload: {
          image: {
            url: 'https://honest.cash/api/upload/image',
            requireAuth: true,
            tokenKey: 'x-auth-token',
            token
          }
        }
      });

      this.editor.getStore().subscribe((state: { type: string; payload: any }) => {
        if (!this.isEditorInitialized && state.type === 'discussion/setCurrentDiscussionId') {
          // this type is loaded last so we can assume that the editor is loaded
          this.isEditorInitialized = true;
          this.editorLoaded.complete();
        }

        if (this.isEditorInitialized && this.post && state.type === 'content/patchItem') {
          // this is when the content is updated
          const markdown = state.payload.text;
          this.post.body = markdown;
          this.post.bodyMD = markdown;
          const title = markdown.match(/\#(.*)/);

          if (title && title[1] !== '' && !this.originalPost.title) {
            this.post.title = title[1];
          } else if (title && title[1] !== '' && this.originalPost.title) {
            this.post.title = title[1];
          } else if ((!title || (title && title[1] === '')) && this.originalPost.title) {
            this.post.title = this.originalPost.title;
          } else if ((!title || (title && title[1] === '')) && !this.originalPost.title) {
            this.post.title = null;
          }
          this.editorChanged.next(editorEvents.editor.changed);
        }
      });
    }
  }

  getEventStreams(): {
    editorLoaded: BehaviorSubject<string>;
    editorChanged: BehaviorSubject<string>;
    postLoaded: BehaviorSubject<string>;
    postChanged: BehaviorSubject<string>;
  } {
    return {
      editorLoaded: this.editorLoaded,
      editorChanged: this.editorChanged,
      postLoaded: this.postLoaded,
      postChanged: this.postChanged
    };
  }

  getEditor(): any {
    return this.editor;
  }

  setPost(post: Post): void {
    if (!this.post) {
      this.post = post;
      this.originalPost = JSON.parse(JSON.stringify(post));
      this.editor.setContent(post.bodyMD);
      this.postLoaded.complete();
    }
  }

  getPost(): Post {
    return this.post;
  }

  saveDraft(cb?: () => void, err?: () => void): void {
    // @todo store actions needed here
    // not implemented
  }

  publishPost(): void {
    // @todo store actions needed here
    // not implemented
  }
}
