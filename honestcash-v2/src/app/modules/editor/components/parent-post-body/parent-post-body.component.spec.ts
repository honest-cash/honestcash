import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorParentPostBodyComponent } from './parent-post-body.component';
import {initialAppStates} from '../../../../shared/mocks/app.states.mock';
import {provideMockStore} from '@ngrx/store/testing';
import {environmentProvider, EnvironmentToken} from '../../../../core/helpers/environment';
import {windowProvider, WindowToken} from '../../../../core/helpers/window';

describe('EditorParentPostBodyComponent', () => {
  let component: EditorParentPostBodyComponent;
  let fixture: ComponentFixture<EditorParentPostBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorParentPostBodyComponent ],
      providers: [
        provideMockStore({initialState: initialAppStates})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorParentPostBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
