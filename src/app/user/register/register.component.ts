import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {AccountService} from '../../_core/api/account.service';
import {RegisterData} from "../../_core/models/User";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submittedPressed = false;
  genders: any = ['Male','Female','Other'];

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.createForm();
  }


  createForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      gender: ['', [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      passwords: this.formBuilder.group(
        {
          password: [null, [Validators.required, Validators.minLength(8)]],
          confPassword: [null, [Validators.required]],
        },
        {validators: this.confPasswordMatchesValidator()}
      ),
    });

    // this.firstName.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });
  }

  changeGender(e) {
    this.gender.setValue(e.target.value, {
      onlySelf: true
    })
  }

  confPasswordMatchesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.get('password').value !== control.get('confPassword').value
        ? {confPass: true}
        : null;
    };
  }

  submit(): void {
    this.submittedPressed = true;
    if (this.registerForm.invalid) {
      return;
    }

    const registerData: RegisterData = new RegisterData(
      this.firstName.value,
      this.lastName.value,
      this.gender.value,
      this.email.value,
      this.password.value
    );

    this.accountService.register(registerData).subscribe(
      (response) => {
        console.log(response)
      },
      () => {
      }
    );
    this.router.navigate(['login']);
  }

  get firstName(): AbstractControl {
    return this.registerForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.registerForm.get('lastName');
  }

  get gender(): AbstractControl {
    return this.registerForm.get('gender');
  }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  get passwords(): AbstractControl {
    return this.registerForm.get('passwords');
  }

  get password(): AbstractControl {
    return this.registerForm.get('passwords').get('password');
  }

  get confPassword(): AbstractControl {
    return this.registerForm.get('passwords').get('confPassword');
  }
}
