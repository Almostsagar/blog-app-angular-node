import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent, TruncatePipe } from './post/post.component';
import { PostcardComponent } from './postcard/postcard.component';
import { RelatedPostsComponent } from './related-posts/related-posts.component';
import { CommentComponent } from './comment/comment.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoryComponent } from './category/category.component';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthGuard } from './services/authguard-service.service';
import { AuthorComponent } from './author/author.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminCreateNewPostComponent } from './admin/admin-create-new-post/admin-create-new-post.component';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminAddUsersComponent } from './admin/admin-add-users/admin-add-users.component';
import { AdminPostsDashboardComponent } from './admin/admin-posts-dashboard/admin-posts-dashboard.component';
import { AdminUpdatePostComponent } from './admin/admin-update-post/admin-update-post.component';
import { EditorModule } from '@tinymce/tinymce-angular';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    ProfileComponent,
    PostComponent,
    PostcardComponent,
    RelatedPostsComponent,
    CommentComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    CategoryComponent,
    TruncatePipe,
    AuthorComponent,
    AdminDashboardComponent,
    AdminCreateNewPostComponent,
    AddCategoryComponent,
    AdminHeaderComponent,
    AdminAddUsersComponent,
    AdminPostsDashboardComponent,
    AdminUpdatePostComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    EditorModule
  ],
  providers: [{ provide: AuthGuard, useClass: AuthGuard }],
  bootstrap: [AppComponent]
})
export class AppModule {  }
