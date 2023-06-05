import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/auth-service.service';
import { LoginSerivesService } from '../services/login-serives.service';

@Component({
  selector: 'app-headers-comp',
  templateUrl: './headers-comp.component.html',
  styleUrls: ['./headers-comp.component.css'],
})
export class HeadersCompComponent {
  user: any = [];
  constructor(
    public t: TokenStorageService,
    private l: LoginSerivesService,
    private router: Router
  ) {}
  role: any;
  ngOnInit() {
    this.user = this.t.getUser();
    this.lol();
  }
  lol() {
    console.log('gferhf');

    if (this.t.getlength() != 0) {
      if (this.user.role.title == 'Admin') {
        document.getElementById('normalheader').style.display = 'none';
        document.getElementById('adminheader').style.display = 'block';
      }
      if (this.user.role.title == 'Normal') {
        document.getElementById('adminheader').style.display = 'none';
        document.getElementById('normalheader').style.display = 'block';
      }
    }
    if (this.t.getlength() == 0) {
      document.getElementById('normalheader').style.display = 'block';
      document.getElementById('adminheader').style.display = 'none';
    }
  }
}
