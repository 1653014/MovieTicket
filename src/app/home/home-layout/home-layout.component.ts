import { Component, OnInit,OnDestroy} from '@angular/core';
import { NguoiDungService } from '../../core/services/nguoi-dung.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})

export class HomeLayoutComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  submitted = false;
  public nguoiDung:any = {};
  public isLogin=false;
  public taikhoanr='';
  public matkhaur='';
  public check=false;
  public sub:Subscription;
  activatedRoute: ActivatedRoute;
  constructor(private svNguoiDung:NguoiDungService, private router: Router,private formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      taikhoan: ['', [Validators.required,Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9]+$')]],
      matkhau: ['', [Validators.required, Validators.minLength(6)]],
      diachi:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      hoten:['', Validators.required],
      cmnd:['', [Validators.required,Validators.pattern('^([0-9]*)$'),Validators.minLength(9),Validators.maxLength(9)]],
      sodt:['', [Validators.required,Validators.pattern('^([0-9]*)$'), Validators.minLength(10),Validators.maxLength(11)]]
  });
    if(localStorage.getItem("nguoiDung"))
    {
        this.nguoiDung = JSON.parse(localStorage.getItem("nguoiDung"));
        this.isLogin = true;
    }
    if(localStorage.getItem("remember"))
    {
        this.check=true;
        this.taikhoanr = JSON.parse(localStorage.getItem("remember")).TaiKhoan;
        this.matkhaur = JSON.parse(localStorage.getItem("remember")).MatKhau;
    }
  }
  get f() { 
    // console.log(this.registerForm.controls);
    return this.registerForm.controls; }
    reload(){
      this.router.navigate(['trang-chu']);
    }
  DangNhap(taikhoan:string,matkhau:string)
  {
    // console.log("ketqua._body");
    this.submitted = true;
    if (this.registerForm.controls.taikhoan.invalid||this.registerForm.controls.matkhau.invalid) {
        return;
    }
      this.sub = this.svNguoiDung.DangNhap(taikhoan,matkhau).subscribe((ketqua)=>{
      
        // console.log(ketqua._body);
          if(ketqua._body != "failure") //ĐN Thành công
          {
            if(this.check){
              localStorage.setItem("remember",JSON.stringify({TaiKhoan:taikhoan,MatKhau:matkhau})); //Lưu storage
            }
            else{
              localStorage.removeItem("remember"); 
            }
            
            this.nguoiDung = JSON.parse(ketqua._body);
           
  
            //Lưu vào storage
            if(this.nguoiDung.LoaiNguoiDung==="Admin"){
              localStorage.setItem("isAdmin",JSON.stringify(this.nguoiDung)); //Lưu storage
              this.router.navigate(['admin']);
              // location.reload(); //Load lại trang sau khi đăng nhập thành công
              
            }
            else{
              this.isLogin = true;
              localStorage.setItem("nguoiDung",JSON.stringify(this.nguoiDung)); //Lưu storage
              location.reload(); //Load lại trang sau khi đăng nhập thành công
            }
            
          }else{
            //console.log(ketqua);
            alert("Tài khoản hoặc mật khấu không đúng !!!")
            this.nguoiDung = {};
            this.isLogin = false;
            localStorage.setItem("nguoiDung","");
          }
        
      });
    //Gọi service đăng nhập
    
     
  }
  clickchinhsua(){
    this.registerForm.controls['diachi'].setErrors(null);
    this.registerForm.controls['hoten'].setErrors(null);
    this.registerForm.controls['email'].setErrors(null);
    this.registerForm.controls['sodt'].setErrors(null);
    this.registerForm.controls['cmnd'].setErrors(null);
  }
  diachichange(event){
    this.submitted = true;
    // console.log(this.registerForm);
    if (this.registerForm.controls.diachi.invalid){
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
  ChinhSua(diachi:string,hoten:string,sodt:string,cmnd:string,email:string){
    console.log("zxc");
    this.submitted=true;
    if (this.registerForm.controls.hoten.invalid||this.registerForm.controls.diachi.invalid
      ||this.registerForm.controls.email.invalid||this.registerForm.controls.sodt.invalid||this.registerForm.controls.cmnd.invalid) {
      return;
  }
    let ND={
      TaiKhoan:this.nguoiDung.TaiKhoan,
      DiaChi:diachi,
      HoTen:hoten,
      SoDT:sodt,
      CMND:parseInt(cmnd),
      Email:email
    }
    // console.log(ND);
      this.sub = this.svNguoiDung.ChinhSua(ND).subscribe((ketqua)=>{
        
        console.log(ketqua._body);
        if(ketqua._body === "Update Success") //ĐN Thành công
        {
          this.nguoiDung.DiaChi=diachi;
          this.nguoiDung.HoTen=hoten;
          this.nguoiDung.SoDT=sodt;
          this.nguoiDung.CMND=parseInt(cmnd);
          this.nguoiDung.Email=email;
          localStorage.removeItem("nguoiDung"); 
          localStorage.setItem("nguoiDung",JSON.stringify(this.nguoiDung)); //Lưu storage
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

  DangKi(taikhoan:string,matkhau:string,diachi:string,hoten:string,sodt:string,cmnd:string,email:string){
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    let ND={
      TaiKhoan:taikhoan,
      MatKhau:matkhau,
      DiaChi:diachi,
      HoTen:hoten,
      SoDT:sodt,
      CMND:parseInt(cmnd),
      Email:email
    }
    // console.log(ND);
      this.sub = this.svNguoiDung.DangKi(ND).subscribe((ketqua)=>{
        
        // console.log(ketqua._body);
        if(ketqua._body === "Update success") //ĐN Thành công
        {
          alert("Đăng kí thành công");
          this.nguoiDung=ND;
          this.isLogin = true;
          localStorage.setItem("nguoiDung",JSON.stringify(this.nguoiDung)); 
          location.reload(); //Load lại trang sau khi đăng nhập thành công
        }
        else if(ketqua._body === "trùng tài khoản") //ĐN Thành công
        {
          alert("Tài khoản đã tồn tại");
          console.log(taikhoan);
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
  DoiMatKhau(matkhaucu:string,matkhaumoi:string,matkhaumoixacnhan:string){
    this.submitted = true;
    if (this.registerForm.controls.matkhau.invalid) {
        return;
    }
    if(matkhaucu!=this.nguoiDung.MatKhau){
      alert("Mật khẩu cũ không đúng!!!");
    }
    else{
      if(matkhaumoi!=matkhaumoixacnhan){
        alert("Mật khẩu xác nhận không trùng với mật khẩu mới!!!")
      }
      else{
        let MK={
          TaiKhoan:this.nguoiDung.TaiKhoan,
          MatKhau:matkhaumoi,
        }

        this.sub = this.svNguoiDung.DoiMatKhau(MK).subscribe((ketqua)=>{
        
          // console.log(ketqua._body);
          if(ketqua._body === "Change Success") //ĐN Thành công
          {
            alert("Đổi mật khẩu thành công");
            this.DangNhap(this.nguoiDung.TaiKhoan,matkhaumoi);
            location.reload(); //Load lại trang sau khi đăng nhập thành công
          }else{
            //console.log(ketqua);
            alert("Fail");
          }
        
      });

      }
    }
    

  }
  Remember(event){
    if(event.target.checked){
      this.check=true;
    }
    else{
      this.check=false;
    }
  }
  DangXuat()
  {
    localStorage.removeItem("nguoiDung"); 
    location.reload(); //Load lại trang sau khi đăng xuất
  }
  QuenMatKhau(taikhoan,email,cmnd){
  
    let pack={
      TaiKhoan:taikhoan,
      Email:email,
      CMND:cmnd
    }

    this.sub = this.svNguoiDung.QuenMatKhau(pack).subscribe((ketqua)=>{
    
      // console.log(ketqua._body);
      if(ketqua._body === "Success") //ĐN Thành công
      {
        alert("Mật khẩu mới của bạn là aaa111");
         //Load lại trang sau khi đăng nhập thành công
      }else if(ketqua._body === "Tài khoản không tồn tại!"){
        //console.log(ketqua);
        alert("Thông tin bạn nhập không đúng !!!");
      }
      else{
        alert("Lỗi database");
      }
    
  });

  }
  ngOnDestroy()
  { 
    this.sub.unsubscribe();
  }

}
