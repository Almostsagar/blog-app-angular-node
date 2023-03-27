import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  post_id: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private l: LoginSerivesService,
    private t: TokenStorageService
  ) // private ll:LoginComponent
  {
    this.post_id = this.router.getCurrentNavigation().extras.state;
  }
  post: any = [];
  creationDate: any;
  form: any = {
    comment: null,
  };
  ngOnInit(): void {
    console.log(this.router.url.substring(6));

    this.http
      .get<any>('http://localhost:3000/post/' + this.router.url.substring(6))
      .subscribe((data) => {
        this.post = data;
        console.log(this.post);
        this.creationDate = this.post.creationDate.substring(0, 10);
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
          post: this.post_id.id,
        })
        .subscribe((data) => {
          // this.post = data;
          console.log(data);
          // this.creationDate=this.post.creationDate.substring(0,10)
        });
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginSerivesService } from '../services/login-serives.service';
import { TokenStorageService } from '../services/auth-service.service';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, args: any[]): string {
    const limit = 50;
    const trail = '...';
    return value.length > limit
      ? (args[2] === 'end' ? trail : '') +
          value.substr(args[0], limit) +
          (args[2] === 'start' ? trail : '')
      : value;
  }
}
