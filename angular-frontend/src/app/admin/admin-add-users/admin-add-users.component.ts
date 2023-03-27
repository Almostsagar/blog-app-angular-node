import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/auth-service.service';
import { LoginSerivesService } from 'src/app/services/login-serives.service';

@Component({
  selector: 'app-admin-add-users',
  templateUrl: './admin-add-users.component.html',
  styleUrls: ['./admin-add-users.component.css']
})
export class AdminAddUsersComponent  implements OnInit{
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
