import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './services/auth-service.service';
import { LoginSerivesService } from './services/login-serives.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'my-new-app';
  user: any = [];
  constructor(
    public t: TokenStorageService,
    private l: LoginSerivesService,
    private router: Router
  ) {}
  role: any;
  isadmin: boolean = false;
  isnormal: boolean = true;
  ngOnInit() {
    console.log(this.title);    
    this.title = 'Title Updated';
    this.user = this.t.getUser();
       if (this.t.getlength()!=0) {
        if (this.user.role.title == 'Admin') {
          this.isadmin = true;
          this.isnormal = false;
        } 
       }    
  }
}
