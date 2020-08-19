import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'startsWith',
})

export class FilterPipe implements PipeTransform {

  transform(value: any[], term: string): any[] {
    if(term){
      return value.filter((x:any) => x.TaiKhoan.toString().toLowerCase().startsWith(term.toString().toLowerCase()) || 
      x.HoTen.toString().toLowerCase().startsWith(term.toString().toLowerCase())||
      x.SoDT.toString().toLowerCase().startsWith(term.toString().toLowerCase())|| 
      x.CMND.toString().toLowerCase().startsWith(term.toString().toLowerCase())||
      x.Email.toString().toLowerCase().startsWith(term.toString().toLowerCase()))
    }
    return value;
  } 
}