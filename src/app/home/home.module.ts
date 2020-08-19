import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrangChiTietComponent } from './trang-chi-tiet/trang-chi-tiet.component';
import { TrangDatVeComponent } from './trang-dat-ve/trang-dat-ve.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { TrangChuComponent } from './trang-chu/trang-chu.component';
import { Routes, RouterModule } from '@angular/router';
import { Title, BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms';
import { IsBookingGuard } from '../core/guard/is-booking.guard';
import { GheComponent } from './trang-dat-ve/ghe/ghe.component';
import { DanhsachgheComponent } from './trang-dat-ve/danhsachghe/danhsachghe.component';
import { TrangvedadatComponent } from './trangvedadat/trangvedadat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';


const homeRoutes: Routes = [
  { path: '', component: HomeLayoutComponent, children: [
    { path: '', component: TrangChuComponent},
    { path: 'trang-chu', component: TrangChuComponent },
    // { path: 'chi-tiet/:id', component: TrangChiTietComponent },
    { path: 'chi-tiet', component: TrangChiTietComponent },
    { path: 'dat-ve', component: TrangDatVeComponent, canActivate:[IsBookingGuard] },
    { path: 've-da-dat', component: TrangvedadatComponent, canActivate:[IsBookingGuard]},
  ]}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    FormsModule,ReactiveFormsModule,
    HttpModule, //Tiêm service http để kết nối api
  ],
  declarations: [
    TrangChiTietComponent, 
    TrangChuComponent,
    TrangDatVeComponent, 
    HomeLayoutComponent, 
     GheComponent, DanhsachgheComponent, TrangvedadatComponent,
     FilterPipe,
  ],
  providers:[Title] 
})
export class HomeModule { }
