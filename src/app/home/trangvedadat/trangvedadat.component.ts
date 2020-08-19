import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ModalService } from '../../core/services/modal.service';
import { PhimService } from '../../core/services/phim.service';
import { FormControl,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-trangvedadat',
  templateUrl: './trangvedadat.component.html',
  styleUrls: ['./trangvedadat.component.css']
})
export class TrangvedadatComponent implements OnInit {
  dsVe:any[];
  sub: Subscription;
  dsHuy = [];

  constructor(private phimService: PhimService,private titleService:Title,
    private modalService:ModalService) { }
    
  
  ngOnInit() {
    this.titleService.setTitle( "Vé đã đặt" );

    this.sub = this.phimService.DSVeDaDat().subscribe(res => {
      
      this.dsVe = JSON.parse(res._body);
      console.log(this.dsVe);
    })
  }
  layDShuy(event,ve){
    if(event.target.checked){
      this.sub = this.phimService.LayTime(ve.MaLichChieu).subscribe(res => {
        //console.log(JSON.parse(res._body));
        let timehethan=JSON.parse(res._body);
        if(timehethan>30){
          this.dsHuy.push(ve);
        }
        else{
          event.target.checked=false;
          alert("Phải hủy vé trước 30 phút trước khi phim được chiếu !!!!")
        }
      });
      
      //console.log(this.dsHuy);
    }
    else{
      let updateItem=this.dsHuy.find(this.findIndextoUpdate,ve);
      let index = this.dsHuy.indexOf(updateItem);
      this.dsHuy.splice(index,1);
    }
  }

  findIndextoUpdate(ve){
    return ve===this;
  }
  HuyVe(){
    this.sub = this.phimService.HuyVe(this.dsHuy).subscribe(res => {
      console.log(res._body);
      if(res._body==="Hủy vé thành công!"){
        alert("Đã hủy vé !!!");
        location.reload();
      }
      else{
        alert("Hủy vé thất bại !!!");
      }
     })
    
  }
  
}
