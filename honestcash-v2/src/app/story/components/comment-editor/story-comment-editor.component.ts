import {Component, ElementRef, HostBinding, Input, OnInit, ViewChild} from '@angular/core';
import Story from '../../models/story';
import User from '../../../user/models/user';
import {Store} from '@ngrx/store';
import {AppStates, selectUserState} from '../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {UserState} from '../../../user/store/user.state';

@Component({
  selector: 'story-comment-editor',
  templateUrl: './story-comment-editor.component.html',
  styleUrls: ['./story-comment-editor.component.scss']
})
export class StoryCommentEditorComponent implements OnInit {
  @Input() public story: Story;
  @ViewChild('commentElement') public commentElement: ElementRef;
  @HostBinding('class') public class = 'col-12 mb-2';
  public updatedComment = '';
  public user: User;
  public user$: Observable<UserState>;
  public userSub: Subscription;
  constructor(
    private store: Store<AppStates>
  ) {
    this.user$ = this.store.select(selectUserState);
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

}
