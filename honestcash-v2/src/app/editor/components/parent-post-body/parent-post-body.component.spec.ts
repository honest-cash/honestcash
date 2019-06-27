import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorParentPostBodyComponent } from './parent-post-body.component';
import {initialAppStates} from '../../../app.states.mock';
import {provideMockStore} from '@ngrx/store/testing';
import {environmentProvider, EnvironmentToken} from '../../../../core/helpers/environment.helper';
import {windowProvider, WindowToken} from '../../../../core/helpers/window.helper';

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

  describe('functions', () => {
    describe('toggleBody', () => {
     it('should set isBodyOpen to true when isBodyOpen is false', () => {
       component.isBodyOpen = false;
       component.toggleBody();
       expect(component.isBodyOpen).toBeTruthy();
     });
      it('should set isBodyOpen to false when isBodyOpen is true', () => {
        component.isBodyOpen = true;
        component.toggleBody();
        expect(component.isBodyOpen).toBeFalsy();
      });
    });
  });
});
