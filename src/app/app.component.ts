import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from './validators/myValidators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'reactive-forms';

  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(
        '',
        [Validators.email, Validators.required, MyValidators.restrictedEmails]
        // [MyValidators.uniqeValue]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      address: new FormGroup({
        country: new FormControl('none', [Validators.required]),
        city: new FormControl('', Validators.required),
      }),
      skills: new FormArray([]),
    });
  }

  submit() {
    if (this.form.valid) {
      const formData = { ...this.form.value };
    }

    this.form.reset({ address: { country: 'none' } });
  }

  setCapital() {
    const cityMap = {
      ukr: 'Kyiv',
      pl: 'Warszawa',
      gb: 'London',
    };

    const cityKey: keyof typeof cityMap = this.form
      .get('address')
      .get('country').value;
    const city = cityMap[cityKey];

    this.form.patchValue({
      address: { city: city },
    });
  }

  addSkill() {
    const control = new FormControl('');
    (<FormArray>this.form.get('skills')).push(control);
  }

  get skills() {
    return this.form.get('skills') as FormArray;
  }
}
