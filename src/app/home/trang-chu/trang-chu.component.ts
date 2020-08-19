import { Component, OnInit, OnDestroy,AfterViewInit  } from '@angular/core';
import { PhimService } from '../../core/services/phim.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ModalService } from '../../core/services/modal.service';
import {formatDate } from '@angular/common';
import $ from 'jquery';
import { isFulfilled } from 'q';
import { isEmpty } from 'rxjs/operators';
declare var $:any;
@Component({
  selector: 'app-trang-chu',
  templateUrl: './trang-chu.component.html',
  styleUrls: ['./trang-chu.component.css']
})
export class TrangChuComponent implements OnInit, OnDestroy{

  dsPhims: any[];
  dsDangChieu=[];
  dsSapChieu=[];
  sub: Subscription;
  public dangchieu=0;

  public LoaiTin:String='DienAnh'
  public number:number = 1;
  HienThiTin(val){
    this.LoaiTin = val;
  }


  constructor(private phimService: PhimService,private titleService:Title,
    private modalService:ModalService) { }

    DanhSachPhimDangChieu =[
      {TenPhim:"Trải nghiệm điểm chết",HinhAnh:'../../../assets/images/trai-nghiem-diem-chet-flatliners-15093522963475.jpg'},
      {TenPhim:"Trải nghiệm điểm chết",HinhAnh:'../../../assets/images/trai-nghiem-diem-chet-flatliners-15093522963475.jpg'},
      {TenPhim:"Trải nghiệm điểm chết",HinhAnh:'../../../assets/images/trai-nghiem-diem-chet-flatliners-15093522963475.jpg'},
      {TenPhim:"Trải nghiệm điểm chết",HinhAnh:'../../../assets/images/trai-nghiem-diem-chet-flatliners-15093522963475.jpg'},
      {TenPhim:"Trải nghiệm điểm chết",HinhAnh:'../../../assets/images/trai-nghiem-diem-chet-flatliners-15093522963475.jpg'},
    ]

    DanhSachDienAnh = [
      {TieuDeSuKien:"Marvel mua lại DC",HinhAnh:'../../../assets/images/rev1.jpg'},
      {TieuDeSuKien:"Ferdinand",HinhAnh:'../../../assets/images/rev2.png'},
      {TieuDeSuKien:"Trùm Hương Cảng",HinhAnh:'../../../assets/images/rev4.jpg'}, 
    ]

    DanhSachKhuyenMai = [
      {TieuDeSuKien:"Khuyến Mãi 1",HinhAnh:'../../../assets/images/rev3.jpg'},
      {TieuDeSuKien:"Khuyến Mãi 2",HinhAnh:'../../../assets/images/rev5.png'},
      {TieuDeSuKien:"Khuyến Mãi 3",HinhAnh:'../../../assets/images/rev6.jpg'}, 
    ]

    DanhSachReview = [
      {TieuDeSuKien:"Sự Kiện KFC",HinhAnh:'../../../assets/images/rev7.jpg'},
      {TieuDeSuKien:"Sự Kiện Lotte",HinhAnh:'../../../assets/images/rev8.jpg'},
      {TieuDeSuKien:"Sự Kiện Texas",HinhAnh:'../../../assets/images/rev9.jpg'}, 
    ]


  ngOnInit() {
    this.titleService.setTitle( "Trang chủ" );
    this.sub = this.phimService.LayDanhSachPhim().subscribe(res => {
      // console.log(JSON.parse(res._body));
      this.dsPhims = JSON.parse(res._body);
    })
  }
  XemChiTiet(phim:any)
  {
    //Cách 1
    let objectData = {isOpen:true,phim:phim,Title:"Chi tiết phim - " + phim.TenPhim }; 
    // this.modalService.setIsOpenModal(objectData);//Đưa 1 tham số vào service
    //Cách 2
   this.modalService.data.emit(JSON.stringify(objectData));
  }
  PhimDangChieu(){
    if (this.dsSapChieu.length != 0) { 
      // array empty or does not exist 
      this.dsSapChieu=[];

  }

    //let dateFormat = require('dateformat');

   
    this.dangchieu=1;
    let now = new Date();
    // let today='';
    let today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
    for(let i=0;i<this.dsPhims.length;i++){
      let day = new Date(this.dsPhims[i].NgayKhoiChieu);
      let day1= new Date(day.getFullYear(),day.getMonth(),day.getDate())
      // if(day.getDate()>now.getDate() && day.getMonth()>&&now.getFullYear()<day.getFullYear()){
      //   this.dsSapChieu.push(this.dsPhims[i]);
       //}
       if (today >= day1) {  
        this.dsDangChieu.push(this.dsPhims[i]);  
      }
    }
    // console.log(this.dsDangChieu);

  }
  PhimSapChieu(){
    //let dateFormat = require('dateformat');
    if (this.dsDangChieu.length != 0) { 
      // array empty or does not exist 
      // delete this.dsDangChieu;
      this.dsDangChieu=[];
     }
    let now = new Date();
    // let today='';
    let today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
    this.dangchieu=2;
    for(let i=0;i<this.dsPhims.length;i++){
      let day = new Date(this.dsPhims[i].NgayKhoiChieu);
      let day1= new Date(day.getFullYear(),day.getMonth(),day.getDate())
      // if(day.getDate()>now.getDate() && day.getMonth()>&&now.getFullYear()<day.getFullYear()){
      //   this.dsSapChieu.push(this.dsPhims[i]);
       //}
       if (day1 > today) {  
        this.dsSapChieu.push(this.dsPhims[i]);  
      }
      

    }
    // console.log(this.dsSapChieu);
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
 
}
