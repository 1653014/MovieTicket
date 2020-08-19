import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PhimService } from '../../core/services/phim.service';
import { Subscription } from 'rxjs';
import { Title, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-trang-chi-tiet',
  templateUrl: './trang-chi-tiet.component.html',
  styleUrls: ['./trang-chi-tiet.component.css']
})
export class TrangChiTietComponent implements OnInit,OnDestroy {

  phim: any = {};
  private in;
  public k=0;
  private giochieu=[];
  private MaPhim;
  public uniqueArray;
  private subParam:Subscription;
  constructor(
    private activateRouter: ActivatedRoute,
    private phimService: PhimService,
    private titleService:Title,
    public sanitizer: DomSanitizer,
    private router: Router
    ) { }
  ngOnInit() {
    //Nhận 1 tham số từ url
  //  this.subParam = this.activateRouter.params.subscribe(params => {
  //     let id = params['id'];
  //     this.loadPhim(id);
  //   });
  //Lấy nhiều tham số
    this.subParam = this.activateRouter.queryParams.subscribe((params) => {
        this.MaPhim = params.MaPhim;
        this.titleService.setTitle(params.TenPhim);
    })
    this.phimService.LayChiTietPhim(this.MaPhim).subscribe((res) => {
      this.phim = JSON.parse(res._body);
      // console.log(this.phim.LichChieu);
      let mang=[];
      let now = new Date();
      // let today='';
      let today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
      for(let i = 0;i<this.phim.LichChieu.length;i++){
        let day = new Date(this.phim.LichChieu[i].NgayChieuGioChieu);
        let day1= new Date(day.getFullYear(),day.getMonth(),day.getDate())
        if(day1>=today){
          mang.push(this.phim.LichChieu[i].NgayChieuGioChieu.slice(0,10));
        }
      }
      this.uniqueArray = Array.from(new Set(mang));//xóa những ngày trùng

    });
  }
 getIndex(inh){
  if (this.giochieu.length != 0) { 
    this.giochieu=[];
   }

    for(let i=0;i<this.phim.LichChieu.length;i++){
      if(inh===this.phim.LichChieu[i].NgayChieuGioChieu.slice(0,10)){
        this.giochieu.push({NgayChieuGioChieu:this.phim.LichChieu[i].NgayChieuGioChieu,MaLichChieu:this.phim.LichChieu[i].MaLichChieu});
      }
    }
    // console.log(this.giochieu);
 }
 DatVe(hchieu){
  // [queryParams]={MaLichChieu:this.phim.LichChieu[this.i].MaLichChieu};
  this.router.navigate(['/dat-ve'],{ queryParams: { MaLichChieu:hchieu.MaLichChieu } });
 }
  ngOnDestroy(){
    this.subParam.unsubscribe();
  }



}
