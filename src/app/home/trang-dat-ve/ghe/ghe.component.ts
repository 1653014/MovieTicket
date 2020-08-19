import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ghe',
  templateUrl: './ghe.component.html',
  styleUrls: ['./ghe.component.css']
})
export class GheComponent implements OnInit {

  @Input() ghe:any;
  private so;
  public TrangThaiDangDat:boolean = false;
  @Output() eventDatGhe:any = new EventEmitter();
  constructor() { }

  ngOnInit() {
    // this.so=this.ghe.MaGhe%10;
    // if(this.so==0)
    // {
    //   this.so=10;
    // }
    // console.log(this.so);
  }
  DatGhe(){
    this.TrangThaiDangDat = !this.TrangThaiDangDat;
    let ghe = {MaGhe:this.ghe.MaGhe, GiaVe: this.ghe.GiaVe, TrangThai: this.TrangThaiDangDat};
    this.eventDatGhe.emit(ghe);
  }
  

}
