import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { LoginSerivesService } from '../services/login-serives.service';
import { TokenStorageService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  f: FormGroup;
  form: any = {
    email: null,
    password: null,
  };
  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  public redirectUrl: string;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(40),
  ]);
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private l: LoginSerivesService,
    private t: TokenStorageService
  ) {}
  ngOnInit(): void {
    
  }

  validateform(): boolean {
    return false;
  }
  login(): void {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form);
    const { email, password } = this.form;
    this.l.login(email, password).subscribe({
      next: (data) => {
        console.log(data);        
        this.t.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // this.reloadPage();
        if (data.role.title=='Normal') {
          this.router.navigate(['/dashboard']);
          
        }
        else{
          this.router.navigate(['/admin/dashboard']);
        }
        
      },
      error: (err) => {
        console.log(err);
        if (err.error == 'Unauthorized') {
          this.errorMessage = err.status;
        } else {
          console.log('cannot find user');
          this.errorMessage = 'cannot find user';
        }
        this.isLoginFailed = true;
      },
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
  preventBack() {
    window.history.forward();
  }
 
}
