import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/auth-service.service';
import { LoginSerivesService } from 'src/app/services/login-serives.service';

@Component({
  selector: 'app-admin-posts-dashboard',
  templateUrl: './admin-posts-dashboard.component.html',
  styleUrls: ['./admin-posts-dashboard.component.css']
})
export class AdminPostsDashboardComponent  implements OnInit{
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
   }
}
