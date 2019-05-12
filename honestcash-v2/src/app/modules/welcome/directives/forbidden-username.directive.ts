import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

/** A user's name can't match the given regular expression */
export function forbiddenUsernameValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = (new RegExp(/[~`!#@$%\^&*+=. \-\[\]\\';,/{}|\\":<>\?]/)).test(control.value);
    return forbidden ? {'forbiddenUsername': {value: control.value}} : null;
  };
}

@Directive({
  selector: '[appForbiddenUsername]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenUsernameValidatorDirective, multi: true}]
})
export class ForbiddenUsernameValidatorDirective implements Validator {
  validate(control: AbstractControl): {[key: string]: any} {
    return forbiddenUsernameValidator()(control);
  }
}
