import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { PhotosComponent } from './components/photos/photos.component';
import { NewsComponent } from './components/news/news.component';

const routes: Routes = [
  {path:"",component:EmployeeListComponent},
  {path:"get-all-emplyee",component:EmployeeListComponent},
  {path:"get-all-news",component:NewsComponent},
  {path:"get-all-photos",component:PhotosComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
