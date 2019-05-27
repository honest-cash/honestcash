import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../../shared/mocks/app.states.mock';
import {EditorPaidSectionSelectionComponent} from './paid-section-selection.component';
import {FormsModule, NgForm} from '@angular/forms';

describe('EditorPaidSectionSelectionComponent', () => {
  let component: EditorPaidSectionSelectionComponent;
  let fixture: ComponentFixture<EditorPaidSectionSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [EditorPaidSectionSelectionComponent],
      providers: [
        provideMockStore({initialState: initialAppStates})
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorPaidSectionSelectionComponent);
    component = fixture.componentInstance;
    component.form = <NgForm>{
      value: {
        title: ''
      }
    };
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
