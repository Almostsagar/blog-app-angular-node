import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSerivesService } from '../services/login-serives.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form: any = {
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    cnfpassword: null,
    role: null,
  };
  roles: any = [];
  errorMessage = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private s: LoginSerivesService
  ) {}
  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/roles').subscribe((data) => {
      this.roles = data;
    });
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  lname = new FormControl('', [Validators.required]);
  fname = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(40),
  ]);
  cnfpasswordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(40),
  ]);
  role = new FormControl('', [Validators.required]);
  signup(): void {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form);
    const { firstname, lastname, email, password, cnfpassword, role } =
      this.form;
    this.s
      .sup(firstname, lastname, email, password, cnfpassword, role)
      .subscribe({
        next: (data) => {
          console.log(data);
          if (data.message == 'user added') {
            this.router.navigate(['/login']);
          } else if (data.message == "passwords didn't match") {
            this.errorMessage = data.message;
            console.log(this.errorMessage);
          } else if (data.message == 'user already found') {
            this.errorMessage = data.message;
            console.log(this.errorMessage);
          } else {
            this.errorMessage = data;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
