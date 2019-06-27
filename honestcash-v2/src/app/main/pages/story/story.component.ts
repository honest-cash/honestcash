import {Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectUserState} from '../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {State as UserState} from '../../../../store/user/user.state';
import User from '../../../user/models/user';
import Story from '../../models/story';
import {EditorService} from '../../../editor/services/editor.service';

@Component({
  selector: 'editor-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit, OnDestroy {
  @HostBinding('class') public class = 'w-100 mb-auto mt-auto';
  @ViewChild('commentElement') public commentElement: ElementRef;
  public updatedComment = '';
  public story: Story;
  public user: User;
  public isLoading = true;
  private user$: Observable<UserState>;
  private userSub: Subscription;

  constructor(
    private store: Store<AppStates>,
    private editorService: EditorService,
  ) {
    this.user$ = this.store.select(selectUserState);
    this.editorService.getPost(56).subscribe((story: Story) => {
      this.story = story;
      this.isLoading = false;
    });
  }

  public ngOnInit() {
    this.userSub = this.user$.subscribe((userState: UserState) => {
      this.user = userState.user;
    });
  }

  public onCommentBlur() {
    this.commentElement.nativeElement.innerHTML = this.updatedComment;
  }

  public onCommentChange($event: any) {
    // InputEvent interface is not yet introduced in Typescript
    // it is required to install a third party types file @types/dom-inputevent
    // hence the any type
    this.updatedComment = $event.target.innerText;
  }

  public ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
