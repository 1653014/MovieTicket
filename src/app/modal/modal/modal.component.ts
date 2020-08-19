import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../../core/services/modal.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  public phim:any;
  public isOpen = false;
  public Title = "";
  constructor(private modalService:ModalService) { }

  ngOnInit() {
    // //Lấy dữ liệu từ modal service
    // this.modalService.getOpenModal.subscribe((data:any) => { 
    //     console.log(data);
    //     this.isOpen = data.isOpen;
    //     this.Title = data.Title;
    //     this.phim = data.phim;
    // });
      //NGRX: Tìm hiểu thêm
    //Cách 2
    this.modalService.data.subscribe((data:any)=>{ //data: Chuỗi
          var ob = JSON.parse(data);
          this.isOpen = ob.isOpen;
          this.Title = ob.Title;
          this.phim = ob.phim;
    })
  }
  CloseModal()
  {
    this.isOpen=false;
  }

}
