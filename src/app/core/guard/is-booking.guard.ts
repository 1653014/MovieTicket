import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsBookingGuard implements CanActivate {
  constructor(private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem("nguoiDung")) //Kiểm tra người dùng dn mới cho vào đặt vé
    {
      return true;
    } else {
      alert("Vui lòng đăng nhập !!!");
      this.router.navigate([""]);
    }
  }
}
