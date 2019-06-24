import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditorWriteComponent} from './write.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../../shared/mocks/app.states.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EDITOR_EDITING_MODES} from '../../components/header/header.component';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../../app.states';
import {EditorStoryLoad} from '../../../../store/editor/editor.actions';

describe('EditorWriteComponent', () => {
  let component: EditorWriteComponent;
  let fixture: ComponentFixture<EditorWriteComponent>;
  let store: Store<AppStates>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [EditorWriteComponent],
      providers: [
        provideMockStore({initialState: initialAppStates})
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });
    fixture = TestBed.createComponent(EditorWriteComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have editingMode equal to Write', () => {
    expect(component.editingMode).toBe(EDITOR_EDITING_MODES.Write);
  });

  it('should have isAutosaveEnabled equal to true', () => {
    expect(component.isAutosaveEnabled).toBeTruthy();
  });

  it('should should dispatch EditorStoryLoad on ngOnInit', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(new EditorStoryLoad());
  });
});
