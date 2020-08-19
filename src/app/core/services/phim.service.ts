import { Injectable } from '@angular/core';
import { Http, Response,Headers} from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhimService {

  constructor(private http: Http) { }

  LayDanhSachPhim(): Observable<any> {
    // let observable = this.http.get('http://sv2.myclass.vn/api/QuanLyPhim/LayDanhSachPhim?MaNhom=GP01')
    // .pipe(map((res: Response) => res.json()));
    // console.log(observable);
    // return observable;
    let observable = this.http.get('http://www.localhost/Demo/getDanhSachPhim.php');
    // console.log(observable);
    return observable;
  }

  LayChiTietPhim(id: string): Observable<any> {
    let apiURL='http://www.localhost/Demo/chitietPhim.php';
     let userData=JSON.stringify({'MP':id}); 
    let header = new Headers();
    header.append('Content-Type','application/json;charset=UTF-8');
    let observable = this.http.put(apiURL,userData,{headers:header});
    return observable;
  }

  LayDanhSachGhe(MaLichChieu: string): Observable<any> {

    let apiURL = `http://www.localhost/Demo/laydanhsachghe.php`;

    let userData=JSON.stringify({'MLC':MaLichChieu}); 
    let header = new Headers();
    header.append('Content-Type','application/json;charset=UTF-8');
    let observable = this.http.post(apiURL,userData,{headers:header});
    return observable;
  }

  DatVe(ve:any): Observable<any>{
    let apiURL = `http://www.localhost/Demo/DatVe.php`;

    let userData=JSON.stringify(ve); 
    let header = new Headers();
    header.append('Content-Type','application/json;charset=UTF-8');
    let observable = this.http.post(apiURL,userData,{headers:header});
    return observable;
  }
  DSVeDaDat(): Observable<any>{
    let apiURL = `http://www.localhost/Demo/DsVeDaDat.php`;
    let header = new Headers();
    header.append('Content-Type','application/json;charset=UTF-8');
    let observable = this.http.post(apiURL,null,{headers:header});
    return observable;
  }
  HuyVe(dsVehuy:any[]): Observable<any>{
    let apiURL = `http://www.localhost/Demo/HuyVe.php`;
    let veHuy=JSON.stringify(dsVehuy);
    let header = new Headers();
    header.append('Content-Type','application/json;charset=UTF-8');
    let observable = this.http.post(apiURL,veHuy,{headers:header});
    return observable;
  }
  LayTime(malichchieu:string): Observable<any>{
    let apiURL = `http://www.localhost/Demo/LayTimeDat.php`;
    let veHuy=JSON.stringify({MaLichChieu:malichchieu});
    let header = new Headers();
    header.append('Content-Type','application/json;charset=UTF-8');
    let observable = this.http.post(apiURL,veHuy,{headers:header});
    return observable;
  }
}