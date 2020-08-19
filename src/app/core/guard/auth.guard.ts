import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private router:Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      //Kiểm tra xem localstorage có chứa thuộc tính isadmin không
      //this.router.navigate(['admin']);

      if(localStorage.getItem("isAdmin"))
      {
        return true;
      }else
      {
        this.router.navigate([""]); //Nếu không có localstorage admin thì trả về trang chủ
      }
      
  }
}
