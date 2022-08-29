import { FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

// interface ValidatorFn {
//   (control: AbstractControl): ValidationErrors | null;
// }

export class MyValidators {
  static restrictedEmails(control: FormControl): { [key: string]: Boolean } {
    if (['test@test', 'alesia2005@ukr.net'].includes(control.value)) {
      return {
        restrictedEmail: true,
      };
    }
    return null;
  }

  static uniqeValue(
    control: FormControl
  ):
    | Promise<{ [key: string]: Boolean }>
    | Observable<{ [key: string]: Boolean }> {
    return new Promise((res) => {
      setTimeout(() => {
        if (['umt1@ukr.net'].includes(control.value)) {
          res({ uniqe: true });
        } else {
          res(null);
        }
      }, 2000);
    });
  }
}
