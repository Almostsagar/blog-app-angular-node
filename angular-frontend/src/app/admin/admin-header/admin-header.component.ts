import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/auth-service.service';
import { LoginSerivesService } from 'src/app/services/login-serives.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  user: any = [];
  constructor(
    public t: TokenStorageService,
    private l: LoginSerivesService,
    private router: Router
  ) {}
  role: any;
  isadmin:boolean=false
  ngOnInit(): void {
    this.user = this.t.getUser();
    // console.log(this.user.role.title);
    // this.role = ;
    if (this.user.role.title=='Admin') {
      this.isadmin=true;
      // window.location.reload();

    }
    else{
      this.isadmin=false;
    }
    if (this.t.getlength() == 0) {
      this.router.navigate(['/login']);
  }
    // console.log(this.isadmin);
    
  }
  logout() {
    this.t.signOut();
    this.router.navigate(['/login']);
    // window.location.reload();
    // this.reloadComponent()
    // this.router.navigate([this.router.url])
    this.l.logout();

  }
  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
}
