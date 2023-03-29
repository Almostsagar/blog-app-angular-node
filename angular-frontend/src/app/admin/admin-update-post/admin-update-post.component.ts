import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { TokenStorageService } from 'src/app/services/auth-service.service';
import { LoginSerivesService } from 'src/app/services/login-serives.service';
@Component({
  selector: 'app-admin-update-post',
  templateUrl: './admin-update-post.component.html',
  styleUrls: ['./admin-update-post.component.css'],
})
export class AdminUpdatePostComponent implements AfterViewInit{
 
  constructor(
    private router: Router,
    private http: HttpClient,
    private l: LoginSerivesService,
    private t: TokenStorageService  ) {}
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    if (this.t.getlength() != 0) {
      if (this.t.getUser().role.title == 'Normal') {
        this.router.navigate(['/login']);
      }
    }
    if (this.t.getlength() == 0) {
      this.router.navigate(['/login']);
    }
  }
}
