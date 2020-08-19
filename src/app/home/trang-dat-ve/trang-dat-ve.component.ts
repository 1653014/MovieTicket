import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PhimService } from '../../core/services/phim.service';

@Component({
  selector: 'app-trang-dat-ve',
  templateUrl: './trang-dat-ve.component.html',
  styleUrls: ['./trang-dat-ve.component.css']
})
export class TrangDatVeComponent implements OnInit, OnDestroy {

  private subMaLichChieu: Subscription;
  private subDanhSachghe: Subscription;
  private maLichChieu: any = 0;
  public lichChieu: any = {};
  public DanhSachGheDuocDat = [];
  private tongtien=0;
  private coghe=false;
  constructor(private avtRoute: ActivatedRoute, private phimService: PhimService) { }

  ngOnInit() {
    //Lấy mã lịch chiếu từ url
    this.subMaLichChieu = this.avtRoute.queryParams.subscribe((thamso) => {
      this.maLichChieu = thamso.MaLichChieu;
    })

    //Lấy danh sách ghế từ malichchieu
    this.subDanhSachghe = this.phimService.LayDanhSachGhe(this.maLichChieu)
      .subscribe((ketqua) => {
        // console.log(ketqua._body);
        this.lichChieu = JSON.parse(ketqua._body); // {MaLichChieu: , DanhSachGhe: []}
      })

  }
  DatGhe(gheDuocDat:any)
  {
   
    if(gheDuocDat.TrangThai)
    {
      //Nếu trạng thái được đặc bằng true => push ghế đó vào mảng
      this.tongtien+=gheDuocDat.GiaVe;
        this.DanhSachGheDuocDat.push({MaGhe:gheDuocDat.MaGhe,GiaVe:gheDuocDat.GiaVe});
    }else
    {
        let i = 0 ;
        for(let ghe of this.DanhSachGheDuocDat)
        {
            if(ghe.MaGhe == gheDuocDat.MaGhe)
            {
              this.tongtien-=gheDuocDat.GiaVe;
                this.DanhSachGheDuocDat.splice(i,1);
            }
            i++;
        }
    }
    if(this.DanhSachGheDuocDat.length!=0){
      this.coghe=true;
      console.log("z.xncmx");
    }
    else{
      this.coghe=false;
    }
    // console.log(this.DanhSachGheDuocDat);
  }
  DatVe(){
    let nguoiDung= JSON.parse(localStorage.getItem("nguoiDung"));

    let ve={
        MaLichChieu:this.maLichChieu,
        TaiKhoanNguoiDung:nguoiDung.TaiKhoan,
        DanhSachVe:this.DanhSachGheDuocDat
    }
    //Gọi service đặt vé
    this.phimService.DatVe(ve).subscribe((kq)=>{
      // console.log(kq._body);
        if(kq._body ==="Update success")
        {
            alert("Đặt vé thành công");
           location.reload();
        }
    })
  }
  
  ngOnDestroy() {
    this.subDanhSachghe.unsubscribe();
    this.subMaLichChieu.unsubscribe();
  }

}
