import { Component, OnInit } from '@angular/core';
import { PhimService } from 'src/app/core/services/phim.service';
import { Subscription } from 'rxjs';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { AdminService } from 'src/app/core/services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-quan-ly-nguoi-phim',
  templateUrl: './quan-ly-nguoi-phim.component.html',
  styleUrls: ['./quan-ly-nguoi-phim.component.css']
})
export class QuanLyNguoiPhimComponent implements OnInit {

  dsPhim:any[];
  sub: Subscription;
  phim:any;
  dsPhimxoa=[];
  registerForm: FormGroup;
  submitted = false;
  constructor( public sanitizer: DomSanitizer,private phimService: PhimService , private adminservice:AdminService,private formBuilder: FormBuilder,private titleService:Title) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      tenphim: ['',  Validators.required],
      mota: ['', Validators.required],
      ngaykhoichieu:['', [Validators.required,Validators.pattern('(?:20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))')]],
      hinhanh: ['', [Validators.required,Validators.pattern('https?://www.+')]],
      trailer:['', [Validators.required,Validators.pattern('https?://www.+')]],
      danhgia:['', [Validators.required,Validators.pattern('^([1-5]*)$')]]
  });
    this.sub = this.phimService.LayDanhSachPhim().subscribe(res => {
      this.dsPhim = JSON.parse(res._body);
      // console.log(this.dsPhim);
  
    })
  }
  get f() { 
    // console.log(this.registerForm.controls);
    return this.registerForm.controls; }
  getPhim(phim:any){
    // console.log(phim);
    this.registerForm.controls['tenphim'].setErrors(null);
    this.registerForm.controls['mota'].setErrors(null);
      this.registerForm.controls['ngaykhoichieu'].setErrors(null);
      this.registerForm.controls['hinhanh'].setErrors(null);
      this.registerForm.controls['trailer'].setErrors(null);
      this.registerForm.controls['danhgia'].setErrors(null);
    this.phim=phim;
  }
  motachange(){
    this.submitted = true;
    // console.log(this.registerForm);
    if (this.registerForm.controls.mota.invalid){
      return;
    }
  }
  tenphimchange(){
    this.submitted = true;
    // console.log(this.registerForm);
    if (this.registerForm.controls.tenphim.invalid){
      return;
    }
  }
  ngakhoichieuchange(){
    this.submitted = true;
    // console.log(this.registerForm);
    if (this.registerForm.controls.ngaykhoichieu.invalid){
      return;
    }
  }
  hinhanhchange(){
    this.submitted = true;
    // console.log(this.registerForm);
    if (this.registerForm.controls.mota.invalid){
      return;
    }
  }
  trailerchange(){
    this.submitted = true;
    // console.log(this.registerForm);
    if (this.registerForm.controls.trailer.invalid){
      return;
    }
  }
  danhgiachange(){
    this.submitted = true;
    // console.log(this.registerForm);
    if (this.registerForm.controls.danhgia.invalid){
      return;
    }
  }
  AdminChinhSuaPhim(tenphim:string,mota:string,ngaykhoichieu:string,hinhanh:string,trailer:string,danhgia:string){
   
    this.submitted=true;
    if (this.registerForm.controls.tenphim.invalid||this.registerForm.controls.mota.invalid||this.registerForm.controls.hinhanh.invalid
      ||this.registerForm.controls.trailer.invalid||this.registerForm.controls.danhgia.invalid||this.registerForm.controls.ngaykhoichieu.invalid) {
      return;
  }
    let phim={
      MaPhim:parseInt(this.phim.MaPhim),
      TenPhim:tenphim,
      MoTa:mota,
      NgayKhoiChieu:ngaykhoichieu,
      HinhAnh:hinhanh,
      Trailer:trailer,
      DanhGia:parseInt(danhgia)
    }
    //console.log(ND);
      this.sub = this.adminservice.AdminChinhSuaphim(phim).subscribe((ketqua)=>{
        
        // console.log(ketqua._body);
        if(ketqua._body === "Update Success") //ĐN Thành công
        {
          alert("Cập nhật thành công");
         location.reload(); //Load lại trang sau khi đăng nhập thành công
        }else{
          //console.log(ketqua);
          alert("Fail");
        }
      
    });
  }
  ThemPhim(tenphim:string,mota:string,ngaykhoichieu:string,hinhanh:string,trailer:string,danhgia:string){
    this.submitted=true;
    if(this.registerForm.invalid){
      return;
    }
    let phim={
      TenPhim:tenphim,
      MoTa:mota,
      NgayKhoiChieu:ngaykhoichieu,
      HinhAnh:hinhanh,
      Trailer:trailer,
      DanhGia:parseInt(danhgia)
    }
   // console.log(ND);
      this.sub = this.adminservice.ThemPhim(phim).subscribe((ketqua)=>{
        
        // console.log(ketqua._body);
        if(ketqua._body === "Insert Success") //ĐN Thành công
        {
          alert("Thêm phim thành công");
          location.reload(); //Load lại trang sau khi đăng nhập thành công
        }else{
          //console.log(ketqua);
          alert("Fail");
        }
      
    });
  }
  layDSphimxoa(event,phim){
    if(event.target.checked){
      this.dsPhimxoa.push(phim);
      
      //console.log(this.dsxoaUser);
    }
    else{
      let updateItem=this.dsPhimxoa.find(this.findIndextoUpdate,phim);
      let index = this.dsPhimxoa.indexOf(updateItem);
      this.dsPhimxoa.splice(index,1);
    }
  }

  findIndextoUpdate(phim){
    return phim===this;
  }
  XoaPhim(){
    if(this.dsPhimxoa.length!=0){
      this.sub = this.adminservice.XoaPhim(this.dsPhimxoa).subscribe(res => {
        // console.log(res._body);
        if(res._body==="Xóa thành công!"){
          alert("Đã xóa phim!!!");
          location.reload();
        }
        else{
          alert("Xóa thất bại !!!");
        }
       })
    }
    else{
      alert("Chọn phim để xóa !!!");
    }
   
    
  }
  ngOnDestroy()
  { 
    this.sub.unsubscribe();
  }

}
