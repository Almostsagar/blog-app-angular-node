import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/auth-service.service';
import { LoginSerivesService } from 'src/app/services/login-serives.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
 constructor(private router: Router,
  private http: HttpClient,
  private l: LoginSerivesService,
  private t: TokenStorageService){}
  ngOnInit(): void { 
    if (this.t.getlength()!=0) {
      if (this.t.getUser().role.title=='Normal') {
        this.router.navigate(['/login']);        
      }
    }
    if (this.t.getlength() == 0) {
      this.router.navigate(['/login']);
  }
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
}
