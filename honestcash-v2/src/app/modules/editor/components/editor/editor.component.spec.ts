import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditorComponent} from './editor.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../../core/mocks/app.states.mock';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [EditorComponent],
      providers: [
        provideMockStore({initialState: initialAppStates})
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('functions', () => {
    it('saveDraftStory should emit an Event through saveDraftStory', () => {
      const emitSpy = spyOn(component.onSaveClick, 'emit').and.callThrough();
      component.saveDraftStory();
      expect(emitSpy).toHaveBeenCalled();
    });
    it('publishStory should emit an Event through onSavePublishClick', () => {
      const emitSpy = spyOn(component.onSavePublishClick, 'emit').and.callThrough();
      component.publishStory();
      expect(emitSpy).toHaveBeenCalled();
    });
  });
});
