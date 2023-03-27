import { Component, OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.css'],
})
export class PostcardComponent implements OnInit {
  creationDate:any
  description:any
  imageSrc:any
  title:any=''
  itemCount: any = [];
  constructor(private http: HttpClient) {}
  posts:any =[]
  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/posts').subscribe((data) => {
      this.posts = data;
      this.itemCount = this.posts;
      console.log(this.posts);
      this.title=this.posts[0].title
      // console.log(this.posts[0]._id);      
    });    
  }
}

