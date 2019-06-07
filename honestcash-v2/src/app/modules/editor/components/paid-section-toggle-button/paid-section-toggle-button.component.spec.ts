import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditorPaidSectionToggleButtonComponent} from './paid-section-toggle-button.component';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../../shared/mocks/app.states.mock';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

describe('EditorPaidSectionToggleButtonComponent', () => {
  let component: EditorPaidSectionToggleButtonComponent;
  let fixture: ComponentFixture<EditorPaidSectionToggleButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NgbModule,
      ],
      providers: [
        provideMockStore({initialState: initialAppStates})
      ],
      declarations: [EditorPaidSectionToggleButtonComponent],
    });

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorPaidSectionToggleButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
