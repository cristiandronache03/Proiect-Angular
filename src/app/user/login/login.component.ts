import {Component, createPlatformFactory, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AccountService} from '../../_core/api/account.service';
import {UserService} from '../../_core/services/user.service';
import {LoginResponse} from "../../_core/models/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  submittedPressed = false;
  loginForm: FormGroup;
  showError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      console.log("BBBBB");
      return;
    }
    this.accountService.login(this.loginForm.value).subscribe((response: LoginResponse) => {
      localStorage.setItem("token", response.token);
      localStorage.setItem('currentUser', JSON.stringify(response.user)); //TO DO backend - login response should return first name too;
      this.userService.setUser(response.user);
      this.router.navigate(['feed']);
    },
    (error) =>
    {
      this.showError = true;
    });
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }
}
