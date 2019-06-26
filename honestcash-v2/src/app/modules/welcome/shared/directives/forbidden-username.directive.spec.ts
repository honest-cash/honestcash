import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { ForbiddenUsernameValidatorDirective} from './forbidden-username.directive';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import { FormsModule, NgForm} from '@angular/forms';

@Component({
  template: `<form>
    <input name="username" [ngModel]="username" type="text" appForbiddenUsername>
  </form>`,
})
class TestForbiddenUsernameComponent {
  username: string;
}

describe('ForbiddenUsernameValidatorDirective', () => {
  let component: TestForbiddenUsernameComponent;
  let fixture: ComponentFixture<TestForbiddenUsernameComponent>;
  let inputEl: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        TestForbiddenUsernameComponent,
        ForbiddenUsernameValidatorDirective
      ],
      providers: [
        NgForm
      ]
    });
    fixture = TestBed.createComponent(TestForbiddenUsernameComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should validate alphanumeric text', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      inputEl.nativeElement.value = 'bad@username';
      inputEl.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const form: NgForm = fixture.debugElement.children[0].injector.get(NgForm);
      const control = form.control.get('username');
      expect(control.hasError('forbiddenUsername')).toBe(true);
      expect(form.control.valid).toEqual(false);
      expect(form.control.hasError('forbiddenUsername', ['username'])).toEqual(true);
    });
  }));

  it('should invalidate non-alphanumeric text', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const form: NgForm = fixture.debugElement.children[0].injector.get(NgForm);
      const control = form.control.get('username');

      inputEl.nativeElement.value = 'goodusername';
      inputEl.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(control.hasError('forbiddenUsername')).toBe(false);
      expect(form.control.valid).toEqual(true);
      expect(form.control.hasError('forbiddenUsername', ['username'])).toEqual(false);
    });
  }));

});
