import {AfterViewInit, Component, HostBinding, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import Story from '../../models/story';
import {AppStates, selectStoryState} from '../../../app.states';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {StoryState} from '../../store/story.state';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {WindowToken} from '../../../../core/shared/helpers/window.helper';

@Component({
  selector: 'story-comment-card',
  templateUrl: './story-comment-card.component.html',
  styleUrls: ['./story-comment-card.component.scss'],
})
export class StoryCommentCardComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() public comment: Story;
  @Input() public isSubComment: boolean;
  @HostBinding('class') public class = 'col-12 mb-2';
  public commentParent: Story;
  public commentDraft: Story;
  public story$: Observable<StoryState>;
  public storySub: Subscription;
  public shouldShowEditor = false;
  public shouldShowInlineEditor = false;
  public scrollTo: number;
  constructor(
    @Inject(WindowToken) private window,
    private store: Store<AppStates>,
  ) {
    this.story$ = this.store.select(selectStoryState);
  }

  public ngOnInit() {
    this.storySub = this.story$.subscribe((storyState: StoryState) => {
      this.commentParent = storyState.commentParent;
      this.commentDraft = storyState.commentDraft;
      this.scrollTo = storyState.scrollTo;

      if (this.commentDraft && this.comment) {
        this.shouldShowEditor = false;
        this.shouldShowInlineEditor = false;
        if (
          this.commentDraft.parentPostId === this.comment.id &&
          !storyState.isCommentEditingSelf
        ) {
          this.shouldShowEditor = true;
          this.shouldShowInlineEditor = false;
        } else if (
          this.commentDraft.id === this.comment.id &&
          storyState.isCommentEditingSelf
        ) {
          this.shouldShowInlineEditor = true;
          this.shouldShowEditor = false;
        }
      }


    });
  }

  public ngAfterViewInit() {
    if (this.scrollTo && this.scrollTo === this.comment.id) {
      const element: HTMLElement = document.getElementById(`comment-${this.scrollTo}`);
      if (element) {
        element.classList.add('highlight');
        // element.scrollIntoView({behavior: 'instant'});
        const top = element.getBoundingClientRect().top + window.scrollY;
        this.window.scroll({
          top: top - (top / 8),
          behavior: 'smooth'
        });
        this.scrollTo = undefined;
        element.classList.remove('highlight');
      }
    }
  }


  public ngOnDestroy() {
    if (this.storySub) {
      this.storySub.unsubscribe();
    }
  }
}
