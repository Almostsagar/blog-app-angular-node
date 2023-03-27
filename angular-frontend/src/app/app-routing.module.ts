import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { AdminAddUsersComponent } from './admin/admin-add-users/admin-add-users.component';
import { AdminCreateNewPostComponent } from './admin/admin-create-new-post/admin-create-new-post.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminPostsDashboardComponent } from './admin/admin-posts-dashboard/admin-posts-dashboard.component';
import { AdminUpdatePostComponent } from './admin/admin-update-post/admin-update-post.component';
import { AuthorComponent } from './author/author.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { PostcardComponent } from './postcard/postcard.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './services/authguard-service.service';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'post/:id', component: PostComponent },
  { path: 'dashboard', component: DashboardComponent,},
  { path: 'posts', component: PostcardComponent },
  { path: 'profile', component: AuthorComponent },
  { path: 'author', component: ProfileComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/post-dashboard', component: AdminPostsDashboardComponent },
  { path: 'admin/post-dashboard/create-post', component: AdminCreateNewPostComponent },
  { path: 'admin/post-dashboard/update-post', component: AdminUpdatePostComponent },
  { path: 'admin/create-cat', component: AddCategoryComponent },
  { path: 'admin/create-cat', component: AddCategoryComponent },
  { path: 'admin/create-users', component: AdminAddUsersComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
