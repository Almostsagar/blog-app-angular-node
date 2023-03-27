import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/auth-service.service';
import { LoginSerivesService } from '../services/login-serives.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  form: any = {
    comment: null,
  };
  post: any = [];
  constructor(private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private l: LoginSerivesService,
    private t: TokenStorageService) { }

  ngOnInit(): void {
    this.http
      .get<any>('http://localhost:3000/post/' + this.router.url.substring(6))
      .subscribe((data) => {
        this.post = data;
      });
  }
  submitcomment(): void {
    if (this.t.getlength() == 0) {
      console.log('Please login');
      this.router.navigate(['/login']);
      return;
    }
    console.log(this.t.getlength());
    console.log(this.t.getUser().email);

    if (this.t.getUser().email) {
      this.http
        .post<any>('http://localhost:3000/comments/add', {
          comment: this.form.comment,
          user: this.t.getUser().email,
          post: this.router.url.substring(6),
        })
        .subscribe((data) => {
          // this.post = data;
          console.log(data);
          // this.creationDate=this.post.creationDate.substring(0,10)
        });
    }
    this.reloadComponent()
  }
  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
}
