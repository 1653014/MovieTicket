import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:Http) { }
  
  public AdminChinhSua(ND:any):Observable<any>{
    let apiURL = `http://www.localhost/Demo/adminchinhsuaND.php`;

    let userData=JSON.stringify(ND); 
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
  public ThemUser(ND:any):Observable<any>{
    let apiURL = `http://www.localhost/Demo/ThemUser.php`;

    let userData=JSON.stringify(ND); 
    let header = new Headers();
    header.append('Content-Type','application/json;charset=UTF-8');
    let observable = this.http.post(apiURL,userData,{headers:header});
    return observable;

  }
  public XoaUser(dsUser:any[]): Observable<any>{
    let apiURL = `http://www.localhost/Demo/XoaUser.php`;
    let ds=JSON.stringify(dsUser);
    let header = new Headers();
    header.append('Content-Type','application/json;charset=UTF-8');
    let observable = this.http.post(apiURL,ds,{headers:header});
    return observable;
  }

  public AdminChinhSuaphim(phim:any):Observable<any>{
    let apiURL = `http://www.localhost/Demo/chinhsuaPhim.php`;

    let Phim=JSON.stringify(phim); 
    let header = new Headers();
    header.append('Content-Type','application/json;charset=UTF-8');
    let observable = this.http.post(apiURL,Phim,{headers:header});
    return observable;

  }
  public ThemPhim(phim:any):Observable<any>{
    let apiURL = `http://www.localhost/Demo/ThemPhim.php`;

    let userData=JSON.stringify(phim); 
    let header = new Headers();
    header.append('Content-Type','application/json;charset=UTF-8');
    let observable = this.http.post(apiURL,userData,{headers:header});
    return observable;

  }
  public XoaPhim(dsPhim:any[]): Observable<any>{
    let apiURL = `http://www.localhost/Demo/XoaPhim.php`;
    let ds=JSON.stringify(dsPhim);
    let header = new Headers();
    header.append('Content-Type','application/json;charset=UTF-8');
    let observable = this.http.post(apiURL,ds,{headers:header});
    return observable;
  }
} 
