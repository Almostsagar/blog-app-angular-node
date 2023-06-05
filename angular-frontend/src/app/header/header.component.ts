import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeadersCompComponent } from '../headers-comp/headers-comp.component';
import { TokenStorageService } from '../services/auth-service.service';
import { LoginSerivesService } from '../services/login-serives.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public t: TokenStorageService,
    private l: LoginSerivesService,
    private router: Router,
    private headerscomp: HeadersCompComponent
  ) {}
  ngOnInit(): void {
  }
  logout() {
    this.headerscomp.lol()
    this.t.signOut();
    this.router.navigate(['/login']);
    this.l.logout();
  }
}