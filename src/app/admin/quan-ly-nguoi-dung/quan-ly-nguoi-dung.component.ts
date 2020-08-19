import { Component, OnInit, OnDestroy,NgModule  } from '@angular/core';
import { PhimService } from 'src/app/core/services/phim.service';
import { BrowserModule } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { AdminService } from 'src/app/core/services/admin.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-quan-ly-nguoi-dung',
  templateUrl: './quan-ly-nguoi-dung.component.html',
  styleUrls: ['./quan-ly-nguoi-dung.component.css']
})
export class QuanLyNguoiDungComponent implements OnInit,OnDestroy {
  dsUSer:any[];
  edituser:any;
  sub: Subscription;
  dsxoaUser=[];
  registerForm: FormGroup;
  submitted = false;
  lnd=false;
  
  constructor(private adminService:AdminService  ,private titleService:Title,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      taikhoan: ['', [Validators.required,Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9]+$')]],
      matkhau: ['', [Validators.required, Validators.minLength(6)]],
      diachi:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      hoten:['', Validators.required],
      loainguoidung:['', Validators.required],
      cmnd:['', [Validators.required,Validators.pattern('^([0-9]*)$'),Validators.minLength(9),Validators.maxLength(9)]],
      sodt:['', [Validators.required,Validators.pattern('^([0-9]*)$'), Validators.minLength(10),Validators.maxLength(11)]]
  });
    this.sub = this.adminService.layDanhSachUser().subscribe(res => {
      this.dsUSer = JSON.parse(res._body);
      // console.log(this.dsUSer);
  
    })
  }
  getUser(user:any){
    // console.log(user);
    this.registerForm.controls['diachi'].setErrors(null);
      this.registerForm.controls['hoten'].setErrors(null);
      this.registerForm.controls['matkhau'].setErrors(null);
      this.registerForm.controls['email'].setErrors(null);
      this.registerForm.controls['sodt'].setErrors(null);
      this.registerForm.controls['cmnd'].setErrors(null);
      this.registerForm.controls['loainguoidung'].setErrors(null);
    this.edituser=user;
  }
  get f() { 
    // console.log(this.registerForm.controls);
    return this.registerForm.controls; }
  
    diachichange(event){
      this.submitted = true;
      // console.log(this.registerForm);
      if (this.registerForm.controls.diachi.invalid){
        return;
      }
    }
    matkhauchange(event){
      this.submitted = true;
      // console.log(this.registerForm);
      if (this.registerForm.controls.matkhau.invalid){
        return;
      }
    }
    cmndchange(event){
      this.submitted = true;
      if (this.registerForm.controls.cmnd.invalid){
        return;
      }
    }
    hotenchange(event){
      this.submitted = true;
      if (this.registerForm.controls.hoten.invalid){
        return;
      }
    }
    emailchange(event){
      this.submitted = true;
      if (this.registerForm.controls.email.invalid){
        return;
      }
    }
    sdtchange(event){
      this.submitted = true;
      if (this.registerForm.controls.sodt.invalid){
        return;
      }
    }
    loainguoidungchange(event){
      this.submitted = true;
      if (this.registerForm.controls.loainguoidung.invalid){
        return;
      }
      if(event.target.value=="ThanhVien"||event.target.value=="Admin"){
        this.lnd=false;
      }
      else{
        this.lnd=true;
      }
      // console.log(this.lnd);
    }

    // sniping tool dau???????
  AdminChinhSua(matkhau:string,diachi:string,hoten:string,sodt:string,cmnd:string,email:string,loainguoidung:string){
    this.submitted=true;
    if (this.registerForm.controls.hoten.invalid||this.registerForm.controls.diachi.invalid
      ||this.registerForm.controls.email.invalid||this.registerForm.controls.sodt.invalid||this.registerForm.controls.cmnd.invalid
      ||this.registerForm.controls.loainguoidung.invalid||this.lnd==true) {
      return;
  }
    let ND={
      TaiKhoan:this.edituser.TaiKhoan,
      MatKhau:matkhau,
      DiaChi:diachi,
      HoTen:hoten,
      SoDT:sodt,
      CMND:parseInt(cmnd),
      Email:email,
      LoaiNguoiDung:loainguoidung
    }
    // console.log(ND);
      this.sub = this.adminService.AdminChinhSua(ND).subscribe((ketqua)=>{
        
        // console.log(ketqua._body);
        if(ketqua._body === "Update Success") //ĐN Thành công
        {
          alert("Cập nhật thành công");
         location.reload(); //Load lại trang sau khi đăng nhập thành công
        }else if(ketqua._body === "trung mail"){
          //console.log(ketqua);
          alert("Email đã tồn tại!!!");
        }
        else if(ketqua._body === "trung cmnd"){
          //console.log(ketqua);
          alert("CMND đã tồn tại!!!");
        }
        else if(ketqua._body === "trung sodt"){
          //console.log(ketqua);
          alert("Số điện thoại đã tồn tại!!!");
        }
      
    });
  }
  ThemUser(taiKhoan:string,matkhau:string,diachi:string,hoten:string,sodt:string,cmnd:string,email:string,loainguoidung:string){
    this.submitted=true;
    if (this.registerForm.invalid||this.lnd==true){
      return;
    }
    let ND={
      TaiKhoan:taiKhoan,
      MatKhau:matkhau,
      DiaChi:diachi,
      HoTen:hoten,
      SoDT:sodt,
      CMND:parseInt(cmnd),
      Email:email,
      LoaiNguoiDung:loainguoidung
    }
    console.log(ND);
      this.sub = this.adminService.ThemUser(ND).subscribe((ketqua)=>{
        
        // console.log(ketqua._body);
        if(ketqua._body === "Insert Success") //ĐN Thành công
        {
          alert("Thêm user thành công");
          location.reload(); //Load lại trang sau khi đăng nhập thành công
        } else if(ketqua._body === "trùng tài khoản") //ĐN Thành công
        {
          alert("Tài khoản đã tồn tại");
          // console.log(taikhoan);
        }
        else if(ketqua._body === "trùng email") //ĐN Thành công
        {
          alert("Email đã tồn tại");
        }
        else if(ketqua._body === "trùng SDT") //ĐN Thành công
        {
          alert("Số điện thoại đã tồn tại");
        }
        else if(ketqua._body === "trùng CMND") //ĐN Thành công
        {
          alert("CMND đã tồn tại");
        }
      
    });
  }
  layDSxoa(event,user){
    if(event.target.checked){
      this.dsxoaUser.push(user);
      
      // console.log(this.dsxoaUser);
    }
    else{
      let updateItem=this.dsxoaUser.find(this.findIndextoUpdate,user);
      let index = this.dsxoaUser.indexOf(updateItem);
      this.dsxoaUser.splice(index,1);
    }
  }

  findIndextoUpdate(user){
    return user===this;
  }
  XoaUser(){
    if(this.dsxoaUser.length!=0){
      this.sub = this.adminService.XoaUser(this.dsxoaUser).subscribe(res => {
        // console.log(res._body);
        if(res._body==="Xóa thành công!"){
          alert("Đã xóa user!!!");
          location.reload();
        }
        else{
          alert("Xóa thất bại !!!");
        }
       })
    }
    else{
      alert("Chọn người dùng để xóa !!!");
    }
   
    
  }
  ngOnDestroy()
  { 
    this.sub.unsubscribe();
  }
}
