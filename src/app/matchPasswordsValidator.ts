import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function matchPasswordsValidator(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    const pwd = control.get('pwd');
    const confirmPwd = control.get('confirmPwd');
    return pwd && confirmPwd && pwd.value !== confirmPwd.value
      ? { passwordsMismatch: true }
      : null;
  };
}