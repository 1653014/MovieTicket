import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyNguoiDungComponent } from './quan-ly-nguoi-dung/quan-ly-nguoi-dung.component';
import { QuanLyNguoiPhimComponent } from './quan-ly-nguoi-phim/quan-ly-nguoi-phim.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { Routes, RouterModule } from '@angular/router';
import { FilterPipe} from './filter.pipe';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HighlightSearch } from './hightlight.pipe';
import { FilterPipephim } from './search.pipe';


const adminRoutes: Routes = [
  { path: '', component: AdminLayoutComponent, children: [
    { path: '', component: QuanLyNguoiDungComponent},
    { path: 'quan-ly-nguoi-dung', component: QuanLyNguoiDungComponent },
    { path: 'quan-ly-phim', component: QuanLyNguoiPhimComponent }
  ]}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    FormsModule,ReactiveFormsModule
  ],
  declarations: [
    QuanLyNguoiDungComponent, 
    QuanLyNguoiPhimComponent, 
    AdminLayoutComponent,
    FilterPipe,
    FilterPipephim,
    HighlightSearch
  ]
})
export class AdminModule { 
  
}
