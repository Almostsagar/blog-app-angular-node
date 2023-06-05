import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/auth-service.service';
import { LoginSerivesService } from '../services/login-serives.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  cat_id:any = ''
  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private l: LoginSerivesService,
    private t: TokenStorageService
      ) {
    this.cat_id = this.router.getCurrentNavigation().extras.state;
  }
  posts: any = [];
  itemCount: any = [];
  ngOnInit(): void {
    this.http
        .get<any>('http://localhost:3000/category/' + this.cat_id.id)
        .subscribe((data) => {
          this.posts = data;
          this.itemCount = this.posts;
          // this.creationDate=this.post.creationDate.substring(0,10)
        });
    console.log(this.cat_id);    
  }
}



import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, args: any[]): string {
    const limit = 100;
    const trail = '...';
    return value.length > limit
      ? (args[2] === 'end' ? trail : '') +
          value.substr(args[0], limit) +
          (args[2] === 'start' ? trail : '')
      : value;
  }
}