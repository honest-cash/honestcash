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
import Story from '../../../../shared/models/story';
import {WindowToken} from '../../../../core/helpers/window';
import {localStorageProvider, LocalStorageToken} from '../../../../core/helpers/localStorage';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {EditorService} from '../../services/editor.service';

const MockWindow = {
  location: {
    href: '',
  }
};

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
      story: new Story(),
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
        HttpClientTestingModule,
        FormsModule,
        NgbModule,
        ToastrModule.forRoot(),
      ],
      declarations: [EditorPublishModalComponent],
      providers: [
        NgbActiveModal,
        ToastrService,
        EditorService,
        provideMockStore({initialState: initialAppStates}),
        {provide: WindowToken, useValue: MockWindow},
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        {provide: LocalStorageToken, useFactory: localStorageProvider},
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorPublishModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('functions', () => {
    it('saveDraftStory should ', () => {

    });
  });
});
