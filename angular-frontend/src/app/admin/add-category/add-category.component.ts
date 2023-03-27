import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/auth-service.service';
import { LoginSerivesService } from 'src/app/services/login-serives.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  form: any = {
    title: null,
  };
  dataRefresher: any;

  cat: any = [];
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
    this.getdata()
    // this.refreshData()
  }
  getdata(){
    this.http.get<any>('http://localhost:3000/category/').subscribe((data) => {
      this.cat = data;
      console.log(data);
      // this.creationDate=this.post.creationDate.substring(0,10)
    });
  }
  submitcat() {
    this.http
      .post<any>('http://localhost:3000/category/add', {
        title: this.form.title,
      })
      .subscribe((data) => {
        console.log(data);
      });
      this.getdata()
  }
  deletecat(catid){
    this.http
    .post<any>('http://localhost:3000/category/remove/' + catid, {
      title: this.form.title,
    })
    .subscribe((data) => {
      console.log(data);
    });
    this.getdata()
  }
 
}
