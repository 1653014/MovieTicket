import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-danhsachghe',
  templateUrl: './danhsachghe.component.html',
  styleUrls: ['./danhsachghe.component.css']
})
export class DanhsachgheComponent implements OnInit {

  @Input() danhSachGhe:any[];
  constructor() { 

  }

  ngOnInit() {
    console.log(this.danhSachGhe);
  }
 


}
