import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/auth-service.service';
import { LoginSerivesService } from 'src/app/services/login-serives.service';

@Component({
  selector: 'app-admin-posts-dashboard',
  templateUrl: './admin-posts-dashboard.component.html',
  styleUrls: ['./admin-posts-dashboard.component.css'],
})
export class AdminPostsDashboardComponent implements OnInit {
  posts:any=[]
  constructor(
    private router: Router,
    private http: HttpClient,
    private l: LoginSerivesService,
    private t: TokenStorageService
  ) {}
  ngOnInit(): void {
    if (this.t.getlength() != 0) {
      if (this.t.getUser().role.title == 'Normal') {
        this.router.navigate(['/login']);
      }
    }
    if (this.t.getlength() == 0) {
      this.router.navigate(['/login']);
    }
    this.getdata()
  }
  getdata(){
    console.log("lol");
    
    this.http.get<any>('http://localhost:3000/posts').subscribe((data) => {
      this.posts = data;
      console.log(data);
      // this.creationDate=this.post.creationDate.substring(0,10)
    });
  }
}
