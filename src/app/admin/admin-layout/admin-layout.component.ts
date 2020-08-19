import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  public nguoiDung:any = {};
  public isLogin=false;
  constructor() { }

  ngOnInit() {
    if(localStorage.getItem("isAdmin"))
    {
        this.nguoiDung = JSON.parse(localStorage.getItem("isAdmin"));
        this.isLogin = true;
        // console.log(this.nguoiDung);
    }
  }
  
  DangXuat()
  {
    localStorage.removeItem("isAdmin"); 
    location.reload(); //Load lại trang sau khi đăng xuất
  }
}
