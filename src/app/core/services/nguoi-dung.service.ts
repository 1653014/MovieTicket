import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NguoiDungService {

  constructor(private http:Http) { }
  public DangNhap(taikhoan:string,matkhau:string):Observable<any>{
    let apiURL = `http://www.localhost/Demo/Login.php`;

    let userData=JSON.stringify({'TK':taikhoan,'MK':matkhau}); 
    let header = new Headers();
    header.append('Content-Type','application/json;charset=UTF-8');
    let observable = this.http.post(apiURL,userData,{headers:header});
    return observable;
  }


  public ChinhSua(ND:any):Observable<any>{
    let apiURL = `http://www.localhost/Demo/chinhsuathongtin.php`;

    let userData=JSON.stringify(ND); 
    let header = new Headers();
    header.append('Content-Type','application/json;charset=UTF-8');
    let observable = this.http.post(apiURL,userData,{headers:header});
    return observable;

  }
  public DangKi(ND:any):Observable<any>{
    let apiURL = `http://www.localhost/Demo/DangKi.php`;

    let userData=JSON.stringify(ND); 
    let header = new Headers();
    header.append('Content-Type','application/json;charset=UTF-8');
    let observable = this.http.post(apiURL,userData,{headers:header});
    return observable;

  }
  public DoiMatKhau(MK:any):Observable<any>{
    let apiURL = `http://www.localhost/Demo/DoiMatKhau.php`;

    let userData=JSON.stringify(MK); 
    let header = new Headers();
    header.append('Content-Type','application/json;charset=UTF-8');
    let observable = this.http.post(apiURL,userData,{headers:header});
    return observable;

  }
  public layDanhSachUser(): Observable<any> {
    let observable = this.http.get(`http://www.localhost/Demo/layDanhSachUser.php`);
    //console.log(observable);
    return observable;

  }
  public QuenMatKhau(pack:any):Observable<any>{
    let apiURL = `http://www.localhost/Demo/QuenMatKhau.php`;

    let userData=JSON.stringify(pack); 
    let header = new Headers();
    header.append('Content-Type','application/json;charset=UTF-8');
    let observable = this.http.post(apiURL,userData,{headers:header});
    return observable;

  }
} 
