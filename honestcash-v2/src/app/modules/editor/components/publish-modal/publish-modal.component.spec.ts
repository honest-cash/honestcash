import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {provideMockStore} from '@ngrx/store/testing';
import {EditorPublishModalComponent} from './publish-modal.component';
import {FormsModule} from '@angular/forms';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppStates} from '../../../../app.states';
import {initialState as initialAppState} from '../../../../store/app/app.state';
import {initialState as initialWalletState} from '../../../../store/wallet/wallet.state';
import {initialState as initialUserState} from '../../../../store/user/user.state';
import {initialState as initialAuthState} from '../../../../store/auth/auth.state';
import {initialState as initialEditorState} from '../../../../store/editor/editor.state';
import Post from '../../../../shared/models/post';

describe('EditorPublishModalComponent', () => {
  let component: EditorPublishModalComponent;
  let fixture: ComponentFixture<EditorPublishModalComponent>;

  const initialAppStates: AppStates = {
    app: initialAppState,
    wallet: initialWalletState,
    user: initialUserState,
    auth: initialAuthState,
    editor: {
      ...initialEditorState,
      story: new Post(),
    },
  };
  initialAppStates.editor.story.userPostHashtags = [
    {
      id: 1,
      hashtag: 'asdf',
      createdAt: 'ASDF',
      updatedAt: 'ASDF',
      userPostId: 4
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NgbModule,
      ],
      declarations: [EditorPublishModalComponent],
      providers: [
        NgbActiveModal,
        provideMockStore({initialState: initialAppStates})
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorPublishModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('functions', () => {
    it('saveDraftStory should ', () => {

    });
  });
});
